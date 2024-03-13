import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  const tree = [
    {
      type: "div",
      styles: ["bg-black"],
      id: 361,
      childrens: [
        {
          type: "div",
          styles: ["bg-red-500", "w-1/2"],
          id: 400,
          childrens: [
            {
              type: "h1",
              styles: ["text-blue-500", "text-xl"],
              content: "Hello world!",
              id: 121,
            },
          ],
        },
      ],
    },
    {
      type: "div",
      styles: ["bg-green-500"],
      id: 11,
      childrens: [
        {
          type: "h1",
          styles: ["text-black", "text-3xl"],
          content: "Goodbye world!",
          id: 154,
        },
      ],
    },
  ];

  const [type, setType] = useState("div");
  const [styles, setStyle] = useState("");
  const [content, setContent] = useState("");
  const [page, setPage] = useState(tree);
  const [selected, setSelected] = useState(0);

  
  function handleAdd(type, styles, content = "") {
    let block = createBlock(type, styles.split(" "), content);
    let newTree = [...page, block];
    setPage(newTree);
  }

  function createBlock(type, styles, content) {
    if (type === "div") {
      return {
        type,
        styles,
        id: uuidv4(),
        childrens: [],
      };
    }
    if (type === "h1") {
      return {
        type,
        styles,
        id: uuidv4(),
        content,
      };
    }
  }

  function parseTree(tree) {
    return tree.map(function (node) {
      if (node.type === "div") {
        if (node.childrens) {
          return (
            <div
              onClick={() => {
                setSelected(node.id);
              }}
              id={node.id}
              key={node.id}
              className={`${node.styles.join(" ")} ${selected === node.id ? 'border border-blue-500 border-dashed' : ''}`}
            >
              {parseTree(node.childrens)}
            </div>
          );
        } else {
          return (
            <div
              onClick={() => {
                setSelected(node.id);
              }}
              id={node.id}
              key={node.id}
              className={node.styles.join(" ")}
            ></div>
          );
        }
      }
      if (node.type === "h1") {
        return (
          <h1
            onClick={() => {
              setSelected(node.id);
            }}
            id={node.id}
            key={node.id}
            className={`${node.styles.join(" ")} ${selected === node.id ? 'border border-blue-500 border-dashed' : ''}`}
          >
            {node.content}
          </h1>
        );
      }
      return null;
    });
  }

  return (
    <div>
      <div className="">{parseTree(page)}</div>

      <div className="fixed right-8 bottom-8">
        <div className="border border-black rounded-xl p-8 z-50 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAdd(type, styles, content);
            }}
            className="flex flex-col gap-2"
          >
            <h1 className="text-center ">Добавить элемент</h1>
            <label>Тип элемента</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border border-black rounded-lg "
            >
              <option value={"div"}>DIV</option>
              <option value={"h1"}>H1</option>
            </select>
            <label>Стили</label>
            <input
              onChange={(e) => setStyle(e.target.value)}
              value={styles}
              type="text"
              className="border border-black rounded-lg"
            />
            <label>Контент?</label>
            <input
              onChange={(e) => setContent(e.target.value)}
              value={content}
              type="text"
              className="border border-black rounded-lg"
            />
            <button
              type="submit"
              className="border border-black  rounded-xl mt-4 "
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}