import React from "react";
import { DockLayout } from "rc-dock";
import ExplorerTab from "../../components/ExplorerTab";
import "./HomeLayout.scss";
import WaveTab from "../../components/WaveTab";

import { runner } from "../../utils/runner";
import async from "async";

let name = window.location.pathname.split("/").pop();
name = name.substr(0, name.length - 5);

export const jsxTab = {
  id: "jsxTab",
  title: "jsx",
  closable: true,
  content: <iframe src={`./${name}.jsx.html`} />,
};

export const htmlTab = {
  id: "htmlTab",
  title: "html",
  closable: true,
  content: <iframe src={`./${name}.html.html`} />,
};

let tab = {
  content: <div>Tab Content</div>,
  closable: true,
};

export default function HomeLayout(props) {
  const { project } = props;
  let dockLayout;

  const onDoubleClickAudioFile = (e, oneAudio) => {
    e.preventDefault();

    console.log("click en cancion");
    console.log(oneAudio);

    /*if (!oneAudio.hasData) {
      await runner(oneAudio);
      console.log("ya se proceso el audio");
    }*/

    dockLayout.updateTab("waveTab", {
      size: 1000,
      tabs: [
        {
          ...tab,
          id: "waveTab",
          title: "Audio: ",
          content: <WaveTab audio={oneAudio} />,
        },
      ],
      panelLock: { panelStyle: "main" },
    });
  };

  let defaultLayout = {
    dockbox: {
      mode: "horizontal",
      children: [
        {
          mode: "vertical",
          size: 200,
          children: [
            {
              tabs: [
                { ...tab, id: "t1", title: "Tab 1" },
                { ...tab, id: "t2", title: "Tab 2" },
              ],
            },
            {
              tabs: [
                {
                  ...tab,
                  id: "explorerTab",
                  title: "Project:",
                  closable: false,
                  content: (
                    <ExplorerTab
                      project={project}
                      onDoubleClickAudioFile={onDoubleClickAudioFile}
                    />
                  ),
                  minWidth: 410,
                  minHeight: 300,
                },
              ],
            },
          ],
        },
        {
          size: 1000,
          tabs: [
            {
              ...tab,
              id: "waveTab",
              title: "Audio: ",
              content: <WaveTab />,
            },
          ],
          panelLock: { panelStyle: "main" },
        },
        {
          size: 200,
          tabs: [{ ...tab, id: "t8", title: "Tab 8" }],
        },
      ],
    },
    floatbox: {
      mode: "float",
      children: [
        {
          tabs: [
            { ...tab, id: "t9", title: "Tab 9", content: <div>Float</div> },
            { ...tab, id: "t10", title: "Tab 10" },
          ],
          x: 300,
          y: 150,
          w: 400,
          h: 300,
        },
      ],
    },
  };

  const getRef = (r) => {
    dockLayout = r;
  };

  /*const onDragNewTab = (e) => {
    let content = `New Tab ${count++}`;
    DragStore.dragStart(
      DockContextType,
      {
        tab: {
          id: content,
          content: <div style-rc-dock={{ padding: 20 }}>{content}</div>,
          title: content,
          closable: true,
        },
      },
      e.nativeEvent
    );
  };*/

  return (
    <DockLayout
      ref={getRef}
      defaultLayout={defaultLayout}
      style={{ position: "absolute", left: 10, top: 10, right: 10, bottom: 10 }}
    />
  );
}
