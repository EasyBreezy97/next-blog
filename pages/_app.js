import '../styles/global.css'
import 'react-quill/dist/quill.snow.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default function App({Component,pageProps}){
  return <Component {...pageProps}/>
}