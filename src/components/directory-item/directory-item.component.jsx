import { Link } from "react-router-dom";

import {
  BackgroundImage,
  DirectoryBodyContainer,
  DirectoryItemContainer,
} from "./directory-item.styles";

function DirectoryItem({ category }) {
  return (
    <DirectoryItemContainer>
      <BackgroundImage imageUrl={category.imageUrl} />
      <DirectoryBodyContainer to={category.route}>
        <h2>{category.title}</h2>
        <p>Shop Now</p>
      </DirectoryBodyContainer>
    </DirectoryItemContainer>
  );
}

export default DirectoryItem;
