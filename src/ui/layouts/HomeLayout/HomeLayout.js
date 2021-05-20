import React, { useState } from "react";
import { DockLayout } from "rc-dock";
import ExplorerTab from "../../components/ExplorerTab";
import TopBar from "../../components/TopBar";
import WaveTab from "../../components/WaveTab";
import SegmentTab from "../../components/SegmentTab";
import LabelTab from "../../components/LabelTab";

import "./HomeLayout.scss";
import IppTab from "../../components/Ipp/IppTab";

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
  const { project, setProject } = props;
  let deleteSegment;
  let deleteLabel;
  let dockLayout;
  let currentAudio;

  const onCloseAudio = () => {
    if (dockLayout) {
      dockLayout.updateTab("segmentTab", {
        id: "segmentTab",
        title: "Segmentos",
        content: <SegmentTab onClose={true} />,
      });

      dockLayout.updateTab("labelTab", {
        id: "labelTab",
        title: "Etiquetas",
        content: <LabelTab onClose={true} />,
      });
    }
  };

  const onDoubleClickLabel = (e, label) => {
    console.log("Doble click, ", label);

    const labelToUpdate = { ...label };

    dockLayout.updateTab(`${currentAudio.name}`, {
      id: `${currentAudio.name}`,
      title: `${currentAudio.name}`,
      closable: true,
      content: (
        <WaveTab
          audio={currentAudio}
          onAddSegment={onAddSegment}
          onAddLabel={onAddLabel}
          onClose={onCloseAudio}
          deleteSegment={deleteSegment}
          updateSegment={updateSegment}
          updateLabel={updateLabel}
          onDoubleClickLabel={labelToUpdate}
          project={project}
        />
      ),
    });
  };

  const onDoubleClickSegment = (e, segment) => {
    const segmentToUpdate = { ...segment };

    dockLayout.updateTab(`${currentAudio.name}`, {
      id: `${currentAudio.name}`,
      title: `${currentAudio.name}`,
      closable: true,
      content: (
        <WaveTab
          audio={currentAudio}
          onAddSegment={onAddSegment}
          onAddLabel={onAddLabel}
          onClose={onCloseAudio}
          deleteSegment={deleteSegment}
          updateSegment={updateSegment}
          updateLabel={updateLabel}
          onDoubleClickSegment={segmentToUpdate}
          project={project}
        />
      ),
    });
  };

  const onDoubleClickAudioFile = (e, oneAudio) => {
    e.preventDefault();

    currentAudio = oneAudio;

    const newTab = () => {
      return {
        id: `${oneAudio.name}`,
        title: `${oneAudio.name}`,
        closable: true,
        content: (
          <WaveTab
            audio={oneAudio}
            onAddSegment={onAddSegment}
            onAddLabel={onAddLabel}
            onClose={onCloseAudio}
            deleteSegment={deleteSegment}
            updateSegment={updateSegment}
            updateLabel={updateLabel}
            project={project}
          />
        ),
      };
    };

    if (!dockLayout.find(`${oneAudio.name}`)) {
      //El audio no esta abierto
      dockLayout.dockMove(newTab(), "wavePanel", "middle");
    }

    dockLayout.updateTab("segmentTab", {
      id: "segmentTab",
      title: "Segmentos",
      content: (
        <SegmentTab
          onLoad={true}
          currentAudio={currentAudio}
          onDeleteSegment={onDeleteSegment}
          onDoubleClickSegment={onDoubleClickSegment}
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
          onDeleteLabel={onDeleteLabel}
          onDoubleClickLabel={onDoubleClickLabel}
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
          onAddLabel={onAddLabel}
          onClose={onCloseAudio}
          deleteSegment={deleteSegment}
          project={project}
        />
      ),
    });
  };

  const onDeleteLabel = (e, label) => {
    deleteLabel = label;
    dockLayout.updateTab(`${currentAudio.name}`, {
      id: `${currentAudio.name}`,
      title: `${currentAudio.name}`,
      closable: true,
      content: (
        <WaveTab
          audio={currentAudio}
          onAddSegment={onAddSegment}
          onAddLabel={onAddLabel}
          onClose={onCloseAudio}
          deleteLabel={deleteLabel}
          project={project}
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
          onDoubleClickSegment={onDoubleClickSegment}
        />
      ),
    });
  };

  const onAddLabel = (label) => {
    console.log("agregar etiqueta", label);

    dockLayout.updateTab("labelTab", {
      id: "labelTab",
      title: "Etiquetas",
      content: (
        <LabelTab
          newLabelToAdd={label}
          currentAudio={currentAudio}
          onDeleteLabel={onDeleteLabel}
          onDoubleClickLabel={onDoubleClickLabel}
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
          onDoubleClickSegment={onDoubleClickSegment}
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
          onDoubleClickSegment={onDoubleClickSegment}
        />
      ),
    });
  };

  const updateLabel = (label) => {
    // para actualizar el UseEffect
    dockLayout.updateTab("labelTab", {
      id: "labelTab",
      title: "Etiquetas",
      content: (
        <LabelTab
          labelToUpdate={null}
          currentAudio={currentAudio}
          onDeleteLabel={onDeleteLabel}
          onDoubleClickLabel={onDoubleClickLabel}
        />
      ),
    });

    dockLayout.updateTab("labelTab", {
      id: "labelTab",
      title: "Etiquetas",
      content: (
        <LabelTab
          labelToUpdate={label}
          currentAudio={currentAudio}
          onDeleteLabel={onDeleteLabel}
          onDoubleClickLabel={onDoubleClickLabel}
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
                {
                  ...tab,
                  id: "ippTab",
                  title: "Ipp",
                  closable: false,
                  content: <IppTab />,
                },
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
      <TopBar setProject={setProject}></TopBar>
      <DockLayout
        ref={getRef}
        defaultLayout={defaultLayout}
        style={{
          backgroundColor: "#070707",
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
