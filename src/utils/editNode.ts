export default function editNode(
  page,
  updatePage,
  idToFound: string,
  newStyles: string[],
  newText = "",
  setNewStyle
) {
  let updatedTree = JSON.parse(JSON.stringify(page));
  function editNodeById(nodes: NodeTree) {
    for (const node of nodes) {
      if (node.id === idToFound) {
        node.styles = newStyles;
        if (node.textContent !== null) {
          node.textContent = newText;
        }
        return;
      }
      if (node.childrens?.length > 0) {
        editNodeById(node.childrens);
      }
    }
  }
  editNodeById(updatedTree);
  updatePage(updatedTree);
  setNewStyle("");
}
