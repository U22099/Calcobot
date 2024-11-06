import { convert } from 'html-to-text';

export default function htmlToText(html){
  const options = {
    wordwrap: 130,
  };
  return convert(html, options); //converts html to text
}