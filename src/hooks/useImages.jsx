import { useState, useEffect } from 'react';
import { graphqlQuery } from '../graphql';
import { PHOTOS as PHOTOS_GQL_Q } from '../graphql/query';

export default function useImages() {
  const [images, setImages] = useState([]);
  const [imgCount, setImgCount] = useState(0);

  const fetch = () => {
    graphqlQuery(PHOTOS_GQL_Q, { page: this.state.currentPage })
      .then((res) => {
        const data = res.photos;
        setImages(
          data.photos.map((photo) => ({
            id: photo.id,
            source: `/api/image/${photo.id}`,
          }))
        );
        setImgCount(data.count);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetch();
  }, []);

  return [images, fetch, imgCount];
}
