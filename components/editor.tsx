/** @jsx h */

import { Code, Component, Fragment, h, Helmet, tw } from "../deps.ts";

export interface TabOptions {
  fileName: string;
  content: string;
  shebang: string;
}

export interface EditorOptions {
  tabs: Array<TabOptions>;
  selected?: string;
}

export class Editor extends Component<EditorOptions> {
  render() {
    return (
      <Fragment>
        <Helmet>
          <script type="application/javascript" src="/highlight.min.js" />
          <script>hljs.highlightAll();</script>
        </Helmet>
        <div
          class={tw
            `flex-grow rounded-xl bg-gray-900 shadow-xl overflow-hidden mb-5`}
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
    return `${prefix}-${tab.fileName}`;
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
    const script = `{
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
    return (
      <Fragment>
        <Helmet footer>
          <script>{script}</script>
        </Helmet>
        <div
          id={this.#getId(tab, "tab-content")}
          class={`tab-content ${tw`flex overflow-auto h-[42rem] ${
            selected ? "" : "hidden"
          }`}`}
        >
          <div
            class={tw
              `w-14 px-2 py-3 text-right font-mono text-sm text-gray-600`}
          >
            {tab.content.trim().split("\n").map((_, i) => <div>{i + 1}</div>)}
          </div>
          <Code code={tab.content} lang="javascript" />
          {/*<SecondaryButton class={}>Foo</SecondaryButton>*/}
        </div>
      </Fragment>
    );
  }

  #renderTabExample(tab: TabOptions, selected?: boolean) {
    const url = `https://cliffy.io/v0.20.1/examples/${tab.fileName}`;
    const code = tab.shebang.replace(/^#!\/usr\/bin\/env -S/, "$") + " " + url;
    return (
      <Code
        id={this.#getId(tab, "tab-example")}
        class={`tab-example ${tw`${selected ? "" : "hidden"}`}`}
        code={code}
        lang="shell"
        rounded
      />
    );
  }
}
