import { parse } from '@vue/compiler-sfc';
import { Project } from 'ts-morph';

const glob = require('fast-glob');
import { promises } from 'fs';
import { dirname } from 'path';

interface PluginDtsOption {
  root: string;
  config: string;
  outDir: string;
  type?: Array<string>;
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

  const files = await glob([option.root + '/**/*.vue']);
  const sourceFiles = [];
  await Promise.all(
    files.map(async (file) => {
      const sfc = parse((await promises.readFile(file, 'utf-8')).toString());
      const { script, scriptSetup } = sfc.descriptor;
      if (script || scriptSetup) {
        let content = '';
        let isTs = false;
        if (script && script.content) {
          content += script.content;
          if (script.lang === 'ts') {
            isTs = true;
          }
        }
        sourceFiles.push(
          project.createSourceFile(
            file.replace('.vue', '') + (isTs ? '.ts' : '.js'),
            content,
          ),
        );
      }
    }),
  );

  const diagnostics = project.getPreEmitDiagnostics();

  console.log(project.formatDiagnosticsWithColorAndContext(diagnostics));

  project.emitToMemory();

  for (const sourceFile of sourceFiles) {
    const emitOutput = sourceFile.getEmitOutput().getOutputFiles();

    for (const outputFile of emitOutput) {
      const filePath = outputFile.getFilePath();
      await promises.mkdir(dirname(filePath), { recursive: true });
      await promises.writeFile(filePath, outputFile.getText(), 'utf8');
    }
  }
}

export function defineTypeConfig(option: PluginDtsOption): PluginDtsOption {
  return option;
}
