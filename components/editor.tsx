/** @jsx h */

import {
  CodeBlock,
  Component,
  Fragment,
  h,
  Helmet,
  styles,
  tw,
} from "../deps.ts";

export interface TabOptions {
  fileName: string;
  code: string;
  command: string;
}

export interface EditorOptions {
  tabs: Array<TabOptions>;
  selected?: string;
}

export class Editor extends Component<EditorOptions> {
  render() {
    return (
      <Fragment>
        <div
          class={tw`flex-grow rounded-xl
            bg-gray-900 dark:bg(gray-600 opacity-40)
            shadow-xl overflow-hidden mb-5
            ${styles.transform.primary}`}
        >
          <div class={tw`flex top-0 items-center overflow-y-auto`}>
            <span class={tw`w-3 h-3 rounded-full ml-3 bg-red-600`} />
            <span class={tw`w-3 h-3 rounded-full ml-2 bg-yellow-300`} />
            <span class={tw`w-3 h-3 rounded-full ml-2 bg-green-400`} />
            {this.props.tabs.map((tab) =>
              this.#renderTabButton(
                tab,
                tab.fileName === this.props.selected,
              )
            )}
          </div>
          {this.props.tabs.map((tab) =>
            this.#renderTabContent(
              tab,
              tab.fileName === this.props.selected,
            )
          )}
        </div>
        {this.props.tabs.map((tab) =>
          this.#renderTabExample(
            tab,
            tab.fileName === this.props.selected,
          )
        )}
      </Fragment>
    );
  }

  #getId(tab: TabOptions, prefix: string) {
    return `${prefix}-${tab.fileName.replace(".", "-")}`;
  }

  #renderTabButton(tab: TabOptions, selected?: boolean) {
    return (
      <button
        id={this.#getId(tab, "tab-button")}
        class={`tab-button ${tw`py-4 px-6 text-gray-200 font-light border-b-2 ${
          selected ? "border-indigo-500" : "border-gray-900"
        } focus:outline-none`}`}
      >
        {tab.fileName}
      </button>
    );
  }

  #renderTabContent(tab: TabOptions, selected?: boolean) {
    return (
      <Fragment>
        <Helmet footer>
          <script>{this.#getTabScript(tab)}</script>
        </Helmet>
        <div
          id={this.#getId(tab, "tab-content")}
          class={`dark tab-content ${tw`flex overflow-auto h-[42rem] ${
            selected ? "" : "hidden"
          }`}`}
        >
          <span
            class={tw`w-14 px-2 py-4 text-right font-mono text-sm text-gray-600`}
          >
            {tab.code.trim().split("\n").map((_, i) => <div>{i + 1}</div>)}
          </span>

          <CodeBlock code={tab.code} lang="javascript" margin={false} />
        </div>
      </Fragment>
    );
  }

  #renderTabExample(tab: TabOptions, selected?: boolean) {
    return (
      <div class="dark">
        <CodeBlock
          id={this.#getId(tab, "tab-example")}
          class={`tab-example ${tw`${selected ? "" : "hidden"}`}`}
          code={tab.command}
          lang="console"
          rounded
        />
      </div>
    );
  }

  #getTabScript(tab: TabOptions) {
    return `{
      document.getElementById("${
      this.#getId(tab, "tab-button")
    }").addEventListener("click", function () {
        document.querySelectorAll(".tab-button").forEach(function (element) {
          if (element.id === "${this.#getId(tab, "tab-button")}") {
            element.classList.add("border-indigo-500");
            element.classList.remove("border-gray-900");
          } else {
            element.classList.remove("border-indigo-500");
            element.classList.add("border-gray-900");
          }
        });
        document.querySelectorAll(".tab-content").forEach(element => element.classList.add("hidden"));
        document.getElementById("${
      this.#getId(tab, "tab-content")
    }").classList.remove("hidden");
        document.querySelectorAll(".tab-example").forEach(element => element.classList.add("hidden"));
        document.getElementById("${
      this.#getId(tab, "tab-example")
    }").classList.remove("hidden");
      });
    }`;
  }
}
