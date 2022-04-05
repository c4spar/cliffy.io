/** @jsx h */

/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { PrimaryButton, SecondaryButton } from "../components/buttons.tsx";
import { Editor } from "../components/editor.tsx";
import { ArrowForward } from "../components/icons.tsx";
import { addModuleVersion } from "../lib/utils.ts";
import {
  AnimatedText,
  assert,
  Component,
  getFiles,
  h,
  Helmet,
  Page,
  Provider,
  SourceFile,
  styles,
  tw,
} from "../deps.ts";

interface HomePageOptions {
  examples: Array<Example>;
  selectedExample?: string;
}

export interface ExamplesDataProviderOptions {
  src: string;
  selected: string;
}

export interface Example extends SourceFile {
  code: string;
  command: string;
}

export class ExamplesDataProvider
  implements Provider<HomePageOptions, ExamplesDataProviderOptions> {
  async onInit(
    req: Request,
    {
      src = "examples",
      selected = "command.ts",
    }: ExamplesDataProviderOptions,
  ): Promise<HomePageOptions> {
    assert(
      src,
      "[ExamplesDataProvider] Missing required option src",
    );
    assert(
      selected,
      "[ExamplesDataProvider] Missing required option selected",
    );

    const files = await getFiles(src, {
      pattern: /\.ts$/,
      read: true,
      req,
      versions: true,
    });

    const basePath: string | undefined = files[0]?.basePath;
    const examplesUrl = `https://deno.land/x/cliffy/${basePath}`;

    const examples = files.map((file) =>
      Object.assign(file, {
        code: addModuleVersion(
          file.content.replace(/#!.+\n+/, ""),
          file.rev,
        ),
        command: addModuleVersion(
          file.content
            .split("\n")[0]
            .replace(/^#!\/usr\/bin\/env -S/, "$") +
            ` ${examplesUrl}/${file.fileName}`,
          file.rev,
        ),
      })
    );

    return {
      selectedExample: selected,
      examples,
    };
  }
}

@Page({
  providers: [ExamplesDataProvider],
})
export default class HomePage extends Component<HomePageOptions> {
  render() {
    return (
      <div css={tw`${styles.transform.primary}`}>
        <Helmet>
          <title>Cliffy - Home</title>
        </Helmet>

        <AnimatedText
          delay={200}
          speed={60}
          class={tw`
            font(fredoka bold) text-center
            my-12 lg:mb-8 lg:mt-12 xl:my-12
            text-[5rem] leading-[4rem]
            sm:text-[10rem] sm:leading-[8rem]
            lg:text-[14rem] lg:leading-[10rem]
            xl:text-[18rem] xl:leading-[14rem]
          `}
        >
          CLIFFY
        </AnimatedText>

        <div
          class={tw`container mx-auto xl:flex xl:items-center xl:space-x-16`}
        >
          <div
            class={tw
              `flex-1 space-y-12 xl:space-y-16 lg:pt-10 xl:pt-0 pb-12 xl:pb-20`}
          >
            <AnimatedText
              delay={900}
              speed={6}
              wordSpace={2}
              webKitFix={true}
              class={tw`
                font(primary bold)
                text(center 2xl sm:3xl transparent)
                leading-7 space-x-2
                bg(clip-text gradient-to-br) from-blue-400 to-purple-600
              `}
            >
              The Framework for Building Interactive Commandline Tools with Deno
            </AnimatedText>

            <AnimatedText
              delay={1100}
              speed={2}
              webKitFix={true}
              class={tw`
                font(primary bold)
                text(center transparent)
                bg(clip-text gradient-to-br) from-blue-400 to-purple-600
              `}
            >
              Create complex and type-safe commandline tools with build-in input
              validation, auto generated help, shell completions, beautiful
              prompts and more...
            </AnimatedText>

            <div class={tw`flex justify-center space-x-4`}>
              <PrimaryButton
                href="/docs"
                style="animation-delay: 1900ms;"
                class={tw`sm:text-lg xl:text-sm 2xl:text-lg
                   opacity-0 transform-gpu animate-slide-in`}
              >
                Get Started
                <ArrowForward class={tw`transform-gpu animate-bounce-right`} />
              </PrimaryButton>
              <SecondaryButton
                href="/docs"
                style="animation-delay: 2000ms;"
                class={tw`sm:text-lg xl:text-sm 2xl:text-lg
                     opacity-0 transform-gpu animate-slide-in`}
              >
                Documentation
              </SecondaryButton>
            </div>
          </div>

          <div class={tw`flex-1 transform-gpu`}>
            <Editor
              tabs={this.props.examples}
              selected={this.props.selectedExample}
            />
          </div>
        </div>
      </div>
    );
  }
}
