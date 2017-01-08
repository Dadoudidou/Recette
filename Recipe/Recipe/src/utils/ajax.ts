class Ajax {
    url: string;
    xmlData: string;
    mode: boolean;
    response: string;
    objHttpReq: any;
    readyState: number;
    status: number;
    responseText: string;

    constructor(postUrl: string, postXml: string, postMode: boolean) {
        this.url = postUrl;
        this.xmlData = postXml;
        this.mode = postMode;
        this.objHttpReq = new XMLHttpRequest();
        this.objHttpReq.mode = this.mode;

        this.objHttpReq.onreadystatechange = this.OnRStateChange;

        this.objHttpReq.open("Post", this.url, this.mode);
        this.objHttpReq.send(this.xmlData);
    }

    OnRStateChange() {
        if (this.readyState == 4 && this.status == 200)
        //here this refers to Ajax
        {
            //alert(xmlhttp.status);
            if (this.mode == false) {
                alert(this.responseText);
            }
            else {
                alert(this.responseText);
            }
        }
    }
}  