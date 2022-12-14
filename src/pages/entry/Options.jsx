import { useState, useEffect } from 'react';
import axios from 'axios';
import ScoopOption from './ScoopOption';
import Row from 'react-bootstrap/Row';
import ToppingOption from './ToppingOption';

export default function Options({ optionType }) {
  const [items, setItems] = useState([]);
  
  //optionType is scoops or toppings
  useEffect(() => {
    axios.get(`http://localhost:3030/${optionType}`)
      .then(({ data }) => setItems(data))
      .catch(err => {
        //TODO handle error
        console.log(err);
      });
  }, [optionType]);
  
  //replace null with topping option
  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;

  const optionItems = items.map(item => <ItemComponent key={item.name} name={item.name} imagePath={item.imagePath} />);

  return <Row>{optionItems}</Row>
}