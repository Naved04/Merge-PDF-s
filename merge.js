import PDFMerger from 'pdf-merger-js'; // const PDFMerger = require('pdf-merger-js')

let merger = new PDFMerger();

const mergePdf = async (p1, p2) => {
    
    await merger.add(p1);  //merge all pages. parameter is the path to file and filename.
    await merger.add(p2); 
    
    let d = new Date().getTime()

    await merger.save(`public/${d}.pdf`); //save under given name and reset the internal document
    merger = new PDFMerger(); 
    return d;
}

export default mergePdf;  // module.exports = mergePdf;
