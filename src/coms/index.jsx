import React, { useEffect, useState } from 'react';

const Demo1 = (props) => {
  const [state, setState] = useState(null);

  useEffect(() => {
    // do something
  }, []);

  return <div>内容</div>;
};

export default Demo1;
