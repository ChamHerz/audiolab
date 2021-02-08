import React, { useState } from "react";
import { DockLayout } from "rc-dock";
import ExplorerTab from "../../components/ExplorerTab";
import TopBar from "../../components/TopBar";

import "./HomeLayout.scss";
import WaveTab from "../../components/WaveTab";

import SegmentTab from "../../components/SegmentTab";
import LabelTab from "../../components/LabelTab";

let name = window.location.pathname.split("/").pop();
name = name.substr(0, name.length - 5);

export const jsxTab = {
  id: "jsxTab",
  title: "jsx",
  closable: true,
  content: <iframe src={`./${name}.jsx.html`} />,
};

let tab = {
  content: <div>Tab Content</div>,
  closable: true,
};

export default function HomeLayout(props) {
  const { project } = props;
  let deleteSegment;
  let dockLayout;
  let currentAudio;

  const onCloseAudio = () => {
    dockLayout.updateTab("segmentTab", {
      id: "segmentTab",
      title: "Segmentos",
      content: <SegmentTab onClose={true} />,
    });
  };

  const onDoubleClickAudioFile = (e, oneAudio) => {
    e.preventDefault();

    const newTab = () => {
      return {
        id: `${oneAudio.name}`,
        title: `${oneAudio.name}`,
        closable: true,
        content: (
          <WaveTab
            audio={oneAudio}
            onAddSegment={onAddSegment}
            onClose={onCloseAudio}
            deleteSegment={deleteSegment}
            updateSegment={updateSegment}
          />
        ),
      };
    };

    if (!dockLayout.find(`${oneAudio.name}`)) {
      //El audio no esta abierto
      dockLayout.dockMove(newTab(), "wavePanel", "middle");
    }

    currentAudio = oneAudio;

    dockLayout.updateTab("segmentTab", {
      id: "segmentTab",
      title: "Segmentos",
      content: (
        <SegmentTab
          onLoad={true}
          currentAudio={currentAudio}
          onDeleteSegment={onDeleteSegment}
        />
      ),
    });

    dockLayout.updateTab("labelTab", {
      id: "labelTab",
      title: "Etiquetas",
      content: (
        <LabelTab
          onLoad={true}
          currentAudio={currentAudio}
          onDeleteSegment={onDeleteSegment}
        />
      ),
    });
  };

  const onDeleteSegment = (e, segment) => {
    deleteSegment = segment;
    dockLayout.updateTab(`${currentAudio.name}`, {
      id: `${currentAudio.name}`,
      title: `${currentAudio.name}`,
      closable: true,
      content: (
        <WaveTab
          audio={currentAudio}
          onAddSegment={onAddSegment}
          onClose={onCloseAudio}
          deleteSegment={deleteSegment}
        />
      ),
    });
  };

  const onAddSegment = (segment) => {
    dockLayout.updateTab("segmentTab", {
      id: "segmentTab",
      title: "Segmentos",
      content: (
        <SegmentTab
          newSegmentToAdd={segment}
          currentAudio={currentAudio}
          onDeleteSegment={onDeleteSegment}
        />
      ),
    });
  };

  const updateSegment = (segment) => {
    // para actualizar el UseEffect
    dockLayout.updateTab("segmentTab", {
      id: "segmentTab",
      title: "Segmentos",
      content: (
        <SegmentTab
          segmentToUpdate={null}
          currentAudio={currentAudio}
          onDeleteSegment={onDeleteSegment}
        />
      ),
    });

    dockLayout.updateTab("segmentTab", {
      id: "segmentTab",
      title: "Segmentos",
      content: (
        <SegmentTab
          segmentToUpdate={segment}
          currentAudio={currentAudio}
          onDeleteSegment={onDeleteSegment}
        />
      ),
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
            {
              tabs: [
                { ...tab, id: "t1", title: "Tab 1" },
                { ...tab, id: "t2", title: "Tab 2" },
              ],
            },
          ],
        },
        {
          mode: "vertical",
          size: 1000,
          children: [
            {
              id: "wavePanel",
              tabs: [],
              panelLock: { panelStyle: "main" },
            },
            {
              mode: "horizontal",
              children: [
                {
                  id: "segmentPanel",
                  tabs: [
                    {
                      id: "segmentTab",
                      title: "Segmentos",
                      content: <SegmentTab />,
                    },
                  ],
                },
                {
                  id: "labelPanel",
                  tabs: [
                    {
                      id: "labelTab",
                      title: "Etiquetas",
                      content: <LabelTab />,
                    },
                  ],
                },
              ],
            },
          ],
          panelLock: { panelStyle: "main" },
        },
      ],
    },
    /*floatbox: {
      mode: "float",
      children: [
        {
          tabs: [{ ...tab, id: "t9", title: "Tab 9", content: <SettingTap /> }],
          x: 300,
          y: 150,
          w: 400,
          h: 300,
        },
      ],
    },*/
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
    <>
      <TopBar></TopBar>
      <DockLayout
        ref={getRef}
        defaultLayout={defaultLayout}
        style={{
          "background-color": "#070707",
          position: "absolute",
          left: 10,
          top: 60,
          right: 10,
          bottom: 10,
        }}
      />
    </>
  );
}
