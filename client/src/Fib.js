import { useState, useEffect } from 'react';
import axios from 'axios';

const Fib = () => {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState('');

  useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, []);

  const fetchValues = async () => {
    const values = await axios
      .get('/api/values/current')
      .catch((err) => console.log(err));
    setValues(values.data);
  };

  const fetchIndexes = async () => {
    const seenIndexes = await axios
      .get('/api/values/all')
      .catch((err) => console.log(err));
    setSeenIndexes(seenIndexes.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post('/api/values', {
        index,
      })
      .catch((err) => console.log(err));

    setIndex('');
  };

  const renderSeenIndexes = () => {
    return seenIndexes.map(({ number }) => number).join(', ');
  };

  const renderValues = () => {
    const entries = [];

    for (let key in values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {values[key]}
        </div>
      );
    }

    return entries;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input value={index} onChange={(e) => setIndex(e.target.value)} />
        <button>Submit</button>
      </form>

      <h3>Indexes I have seen:</h3>
      {renderSeenIndexes()}

      <h3>Calculated values:</h3>
      {renderValues()}
    </div>
  );
};

export default Fib;
