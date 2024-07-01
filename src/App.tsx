import { useState } from "react";
import "rsuite/dist/rsuite.min.css";
import "./App.css";
import {
  useAddProductMutation,
  useDeleteProductMutation,
  useGetGoodsQuery,
} from "./store";
import { Dropdown, Input } from "rsuite";
import BasketPicture from "./img/basket.jpg";

function App() {
  const [count, setCount] = useState("");
  const [newProduct, setNewProduct] = useState("");
  const { data = [], isLoading } = useGetGoodsQuery(count);
  const [addProduct, { isError }] = useAddProductMutation();
  const [deleteProduct, { isError: isErrorDeletingProduct }] =
    useDeleteProductMutation();

  const handleAddNewProduct = async () => {
    if (newProduct) {
      // unwrap for correct using additional params from hook like isError etc
      await addProduct({ name: newProduct }).unwrap();
      setNewProduct("");
    }
  };

  const handleDeleteProduct = async (id: number | string) => {
    await deleteProduct(id).unwrap();
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="goods">
      <div className="goods__wrap">
        <h1 className="goods__title">Shopping List</h1>

        <div className="goods__form">
          <Input
            placeholder="Type good's name"
            size="md"
            type="text"
            value={newProduct}
            onChange={(value) => setNewProduct(value)}
          />

          <button onClick={() => handleAddNewProduct()} className="goods__btn">
            Add product
          </button>
        </div>

        <Dropdown
          title={count || "All"}
          value={count}
          onSelect={(value) => setCount(value)}
          size="md"
        >
          <Dropdown.Item eventKey="">All</Dropdown.Item>
          <Dropdown.Item eventKey="1">1</Dropdown.Item>
          <Dropdown.Item eventKey="2">2</Dropdown.Item>
          <Dropdown.Item eventKey="3">3</Dropdown.Item>
        </Dropdown>

        <ul className="goods__list">
          {data.map((good) => (
            <li key={good.id} className="goods__listItem">
              <p>{good.name}</p>
              <button
                className="goods__listItemRemove"
                onClick={() => handleDeleteProduct(good.id)}
              >
                🗑
              </button>
            </li>
          ))}
        </ul>

        <img src={BasketPicture} alt="basket" className="goods__img" />
      </div>
    </div>
  );
}

export default App;
