/** @jsx h */

/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { PrimaryButton, SecondaryButton } from "../components/buttons.tsx";
import { Editor } from "../components/editor.tsx";
import { ArrowForward } from "../components/icons.tsx";
import {
  AnimatedText,
  assert,
  Component,
  FileOptions,
  getFiles,
  h,
  Helmet,
  Page,
  Provider,
  transformGpu,
  tw,
} from "../deps.ts";

export interface ExamplesDataProviderOptions {
  src: string;
  selected: string;
}

export class ExamplesDataProvider
  implements Provider<HomePageOptions, ExamplesDataProviderOptions> {
  async onInit(
    req: Request,
    options: ExamplesDataProviderOptions,
  ): Promise<HomePageOptions> {
    assert(
      options.src,
      "Missing provider option src for ExamplesDataProvider.",
    );
    assert(
      options.selected,
      "Missing provider option selected for ExamplesDataProvider.",
    );

    const files = await getFiles(options.src, {
      pattern: /\.ts$/,
      read: true,
      cacheKey: req.url,
      req,
    });

    const examples = files.map((file) => ({
      ...file,
      content: file.content.replace(/#!.+\n+/, ""),
      shebang: file.content.split("\n")[0],
    }));

    return {
      selectedExample: options.selected,
      examples,
    };
  }
}

export interface Example extends FileOptions {
  shebang: string;
}

interface HomePageOptions {
  examples: Array<Example>;
  selectedExample?: string;
}

@Page({
  providers: [ExamplesDataProvider],
})
export default class HomePage extends Component<HomePageOptions> {
  render() {
    return (
      <div css={tw`${transformGpu}`}>
        <Helmet>
          <title>Cliffy - Home</title>
        </Helmet>

        <AnimatedText
          speed={30}
          delay={200}
          animation="animate-left-right"
          class={tw`font-display font-bold text-center
            my-12 lg:mb-8 lg:mt-12 xl:my-12
            text-[5rem] leading-[4rem]
            sm:text-[10rem] sm:leading-[8rem]
            lg:text-[14rem] lg:leading-[10rem]
            xl:text-[18rem] xl:leading-[14rem]`}
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
              delay={700}
              speed={2}
              animation="animate-left-right"
              evenColor="text-purple-500"
              oddColor="text-blue-400"
              wordSpace={2}
              class={tw`font-nerd font-bold text-center
                 text-2xl leading-7 sm:text-3xl space-x-2`}
            >
              The Framework for Building Interactive Commandline Tools with Deno
            </AnimatedText>

            <AnimatedText
              delay={1300}
              speed={1}
              class={tw`font-bold text-center`}
            >
              Cliffy is a fullstack CLI Framework that lets you write
              interactive Command Line Tools with Deno.
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
