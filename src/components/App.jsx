import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import SearchBar from './Searchbar/Searchbar';
import { FetchData } from '../API/API';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';

 function App () {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [images, setImages] = useState([])
  const [totalImg, setTotalImg] = useState(0)
  const [Loading, setLoading] = useState(false)

useEffect(() => {
  if (!query) {
    return;
  }
  setLoading(true);
  FetchData(query, page).then(data => {
    if (data.totalHits === 0) {
      Notiflix.Notify.failure('No images matching your request');
      setLoading(false);
      return;
    }
    setImages(prevImages => 
      (page === 1? [...data.hits] : [...prevImages,...data.hits]));
    setTotalImg(data.totalHits)
    setLoading(false);
  });
}, [query,page]);

const handledSearchBar = searchQuery => {
  setQuery(searchQuery);
  setPage(1);
  console.log(query);
};
const pages = (Math.ceil(totalImg / 12) - page) > 0;

const changePage = () => {
  setPage(prevPage => prevPage + 1);
};

   return (
     <>
       <SearchBar onSubmitQuery={handledSearchBar} />
       {images && <ImageGallery images={images} />}
       {Loading && <Loader />}
       {pages && <Button onClick={changePage} />}
     </>
   );}

export {App}


// export class App extends Component {
//   state = {
//     searchReq: '',
//     page: 1,
//     images: [],
//     isLoading: false,
//     totalImg: 0,
//   };

//   async componentDidUpdate(_, prevState) {
//     const { searchReq, page } = this.state;

    
//     if (prevState.searchReq !== searchReq || prevState.page !== page) {
//       try {
//         this.setState({ isLoading: true });
//         await FetchData(searchReq, page)
//           .then(data => {
//             if (data.totalHits === 0) {
//               Notiflix.Notify.failure('No images matching your request');
//               this.setState({ isLoading: false });
//               return;
//             }
//             this.setState(prevState => ({
//               images:[...prevState.images, ...data.hits],
//               totalImg:
//                 page === 1
//                   ? data.totalHits - data.hits.length
//                   : data.totalHits - [...prevState.images, ...data.hits].length,
//             }));
//           });
//       } 
//       catch (error) {console.log(error)}
//       finally {this.setState({ isLoading: false });}
//     }
//   }

//   handledSearchBar = searchReq => {
//     this.setState({ searchReq, page: 1, images: [] });
//   };

//   changePage = () => {
//     this.setState(state => ({ page: state.page + 1 }));
//   };
//   render() {
//     return (
//       <>
//         <SearchBar onSubmit={this.handledSearchBar} />
//         {this.state.images && <ImageGallery images={this.state.images} />}
//         {this.state.isLoading && <Loader />}
//         {!!this.state.totalImg && <Button onClick={this.changePage} />}
//       </>
//     );
//   }
// }
