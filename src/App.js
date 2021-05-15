import React, { useState, useEffect } from "react";

function MartianImageFetcher(props) {
  const [imgSrc, setImgSrc] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${props.photoDate}&api_key=gnesiqnKCJMm8UTYZYi86ZA5RAnrO4TAR9gDstVb`
    )
      .then((res) => res.json())
      .then((data) => {
        setImgSrc(data.photos[0].img_src);
      });
  }, [props.photoDate]);

  if (!imgSrc) {
    return null;
  } else {
    return <img src={imgSrc} alt="Mars rover" />;
  }
}

function App() {
  const [date, setDate] = useState("");

  function handle2019Click() {
    setDate("2019-01-01");
  }
  function handle2020Click() {
    setDate("2020-01-01");
  }

  return (
    <div className="app">
      <div>
        <button onClick={handle2019Click}>Fetch image for 2019</button>
        <button onClick={handle2020Click}>Fetch image for 2020</button>
      </div>
      <hr />

      {date ? <MartianImageFetcher photoDate={date} /> : null}
    </div>
  );
}

export default App;
