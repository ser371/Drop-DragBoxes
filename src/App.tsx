import React, { useState } from "react";
import "./App.css";

interface Box {
  id: number;
  x: number;
  y: number;
  color: string;
}

const App: React.FC = () => {
  const [boxes, setBoxes] = useState<Box[]>([
    { id: 1, x: 50, y: 50, color: "#FF0000" },
    { id: 2, x: 150, y: 120, color: "#00ff11ff" },
  ]);

  const [dragging, setDragging] = useState<number | null>(null);
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent, id: number) => {
    const box = boxes.find((b) => b.id === id);
    if (!box) return;
    setDragging(id);
    setOffset({ x: e.clientX - box.x, y: e.clientY - box.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragging === null) return;
    setBoxes((prev) =>
      prev.map((box) =>
        box.id === dragging
          ? { ...box, x: e.clientX - offset.x, y: e.clientY - offset.y }
          : box
      )
    );
  };

const xyCOr = (boxes: Box[]) => {
  return (
    <div>
      {boxes.map((box) => (
        <p key={box.id}>
          box-x: {box.x} and box-y: {box.y}
        </p>
      ))}
    </div>
  );
};

  

  const handleMouseUp = () => setDragging(null);

  return (
    <div className="container" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <div className="canvas">
        {boxes.map((box) => (
          <div
            key={box.id}
            className="box"
            style={{ left: box.x, top: box.y, backgroundColor: box.color }}
            onMouseDown={(e) => handleMouseDown(e, box.id)}
          ></div>
        ))}
      </div>
      <div className="Annotation">{xyCOr(boxes)}</div>
    </div>
  );
};

export default App;
