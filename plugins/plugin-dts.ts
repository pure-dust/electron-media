import { parse } from '@vue/compiler-sfc';
import { Project } from 'ts-morph';

const glob = require('fast-glob');
import { promises } from 'fs';
import { dirname, basename } from 'path';

interface PluginDtsOption {
  root: string;
  config: string;
  outDir: string;
  type?: Array<string>;
  suffix?: string;
}

export default async function generateTypes(option: PluginDtsOption) {
  const project = new Project({
    compilerOptions: {
      declaration: true,
      emitDeclarationOnly: true,
      noEmitOnError: true,
      allowJs: true, // 如果想兼容 js 语法需要加上
      outDir: option.outDir,
    },
    tsConfigFilePath: 'script/tsconfig.json',
    skipAddingFilesFromTsConfig: true,
  });

  let types = option.type || ['vue', 'ts'];

  const files = await glob(
    types.map((el) => {
      return option.root + `/**/*.${el}`;
    }),
  );

  const sourceFiles = [];
  await Promise.all(
    files.map(async (file) => {
      let content = '';
      let isTs = false;
      if (/\.ts/.test(file)) {
        isTs = true;
        content = await (await promises.readFile(file, 'utf-8')).toString();
      } else {
        const sfc = parse((await promises.readFile(file, 'utf-8')).toString());
        const { script, scriptSetup } = sfc.descriptor;
        if (script || scriptSetup) {
          isTs = false;
          if (script && script.content) {
            content += script.content;
            if (script.lang === 'ts') {
              isTs = true;
            }
          }
        }
      }
      sourceFiles.push(
        project.createSourceFile(
          file.replace(/\.(vue|ts|js)/, '') + '-temp' + (isTs ? '.ts' : '.js'),
          content,
        ),
      );
    }),
  );

  const diagnostics = project.getPreEmitDiagnostics();

  console.log(project.formatDiagnosticsWithColorAndContext(diagnostics));

  project.emitToMemory();

  await promises.mkdir(option.outDir, { recursive: true });

  for (const sourceFile of sourceFiles) {
    const emitOutput = sourceFile.getEmitOutput().getOutputFiles();

    for (const outputFile of emitOutput) {
      let filePath = outputFile.getFilePath();
      if (option.suffix) {
        console.log(option.suffix + '/[^/]+');

        filePath =
          option.outDir +
          filePath
            .match(new RegExp(option.suffix + '/[^/]+'))[0]
            .replace(option.suffix, '') +
          '.d.ts';
      } else {
        filePath =
          option.outDir + '/' + basename(filePath).replace('-temp', '');
      }

      await promises.writeFile(filePath, outputFile.getText(), 'utf8');
      console.log('处理文件', filePath);
    }
  }
}

export function defineTypeConfig(option: PluginDtsOption): PluginDtsOption {
  return option;
}
