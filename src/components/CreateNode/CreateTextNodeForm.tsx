import Button from "../../ui/Button/Button";

export default function CreateTextNodeForm({
  nodeStyle,
  setNodeStyles,
  setNodeType,
  nodeType,
  textContent,
  setTextContent,
}) {
  const textTypes = ["h1", "h2", "h3", "h4", "h5", "h6", "p", "span"];
  return (
    <>
      <label>Semanthic</label>
      <select
        value={nodeType}
        onChange={(event) => setNodeType(event.target.value)}
        className="border border-neutral-300 p-2 rounded-lg "
      >
        {textTypes.map(function (type) {
          return (
            <option key={type} value={type}>
              {type}
            </option>
          );
        })}
      </select>

      <label>Tailwnd classnames</label>
      <input
        onChange={(event) => setNodeStyles(event.target.value)}
        value={nodeStyle}
        type="text"
        className="border border-neutral-300 p-2 rounded-lg"
      />
      <label>Text</label>
      <input
        onChange={(event) => setTextContent(event.target.value)}
        value={textContent}
        type="text"
        className="border border-neutral-300 p-2 rounded-lg"
      />

      <Button type={"primary"}>Add</Button>
    </>
  );
}
