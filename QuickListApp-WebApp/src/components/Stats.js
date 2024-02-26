export default function Stats({ statsItem }) {
  if (!statsItem.length)
    return (
      <p className="stats">
        <em>Start adding items to your grocery list 🧺</em>
      </p>
    );
  const numberItem = statsItem.length;
  const numPacked = statsItem.filter((statsItems) => statsItems.packed).length;
  const percentageItem = Math.round((numPacked / numberItem) * 100);
  return (
    <footer className="stats">
      <em>
        {percentageItem === 100
          ? 'You Got everything! Ready to go 🛒'
          : `You have ${numberItem} item on your grocery list, and you already purchased
        ${numPacked} (${percentageItem}%)`}
      </em>
    </footer>
  );
}
