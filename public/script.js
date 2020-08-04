window.onload = () => {
    const converter = new showdown.Converter();
    const pad = document.getElementById('pad');
    const markdownArea = document.getElementById('markdown');   
    let previousMarkdownValue;
    
    const convertTextAreaToMarkdown = () => {
        var markdownText = pad.value;
        html = converter.makeHtml(markdownText);
        previousMarkdownValue = markdownText;
        markdownArea.innerHTML = html;
    };
    const didChangeOccur = () => {
        if(previousMarkdownValue != pad.value){
            return true;
        }
        return false;
    }

    pad.addEventListener('input', convertTextAreaToMarkdown);
    
    setInterval(() => {
        didChangeOccur() ? convertTextAreaToMarkdown() : ''
    }, 1000);

    if(document.location.pathname.length > 1){
        // implement share js
        var documentName = document.location.pathname.substring(1);
        sharejs.open(documentName, 'text', (error, doc) => {
            doc.attach_textarea(pad);
            convertTextAreaToMarkdown();
        });        
    }
    convertTextAreaToMarkdown();
};