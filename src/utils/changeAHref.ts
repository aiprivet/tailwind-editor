export default function changeAHref(
  newAHref,
  selectedNode,
  updateSelectedNodeAHref,
  updateSelectedNode,
  page,
  updatePage
) {
  let newNode = JSON.parse(JSON.stringify(selectedNode));

  let newPage = JSON.parse(JSON.stringify(page));

  updateSelectedNodeAHref(newAHref);

  updateSelectedNode({ ...newNode, aHref: newAHref });

  function findNode(page) {
    for (let node of page) {
      if (node.id === selectedNode.id) {
        node.aHref = newAHref;
        return;
      } else if (node.childrens?.length > 0) {
        findNode(node.childrens);
      }
    }
  }

  findNode(newPage);
  updatePage(newPage);
}
