import React, { Component } from 'react';

const API = 'https://ydbweb.com:8181/restdemo/commentswithposts';
const DEFAULT_QUERY = '?search=';

function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

class ApplistingPosts extends Component {
    
  constructor(props) {
    super(props);
    

    this.state = {
      hits: [], displaycomments:[],currentPage:1, todosPerPage:3,valuesrch: ''
      ,activeIndex: null
    };
    
    
    const displaycomments = [];
    
    
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmitPost = this.handleSubmitPost.bind(this);
    this.handleChangePost = this.handleChangePost.bind(this);
    this.handleSubmitComment = this.handleSubmitComment.bind(this);
    this.handleChangeComment = this.handleChangeComment.bind(this); 
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
    this.handleSubmitSearch = this.handleSubmitSearch.bind(this);   
    this.handleReset = this.handleReset.bind(this); 
          
          
  }  
  
  loadposts(srch){
    fetch(API + DEFAULT_QUERY+srch)
      .then(response => response.json())
      .then(data => this.setState({ hits: data }));  
      
    for (let i = 0; i < this.state.todosPerPage; i++) { 
        this.state.displaycomments[i]=1;
    }
    
    this.setState({valuesrch:""})
      
  }
  

  componentDidMount() {
      this.loadposts("")

  }
  
  handleClick(event) {
    for (let i = 0; i < this.state.todosPerPage; i++) { 
      this.state.displaycomments[i]=1;
    }        
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  
  Deletepost(id){
    const items = this.state.hits.filter(li => li.id !== id);
    this.setState({ hits: items });
    
  }
 
  
  
  Deletecomment(id,index){
    let commen=Object.assign([],this.state.hits[index].comments);
    let commen1=Object.assign([],this.state.hits);
        
    let myArray = commen.filter(function( common ) {
        return common.dateCreated !== id;
    });
    
    commen1[index].comments=myArray;
    
    this.setState({ hits:commen1 });
    

    
  }  
  
  
  handleSubmitPost() {
   if (this.state.value.trim()!==""){       
    var utc = new Date().toJSON(); 

    var user = {id: create_UUID(), nameuser: "anonymous", dateCreated: utc}

    var objpost={
        id:create_UUID(),
        txt:this.state.value,
        comments:[],
        user:user,
        dateCreated:utc
    }
    
    this.state.hits.unshift(objpost);

    
    this.setState({ value:"" });
    
    this.setState({ hits:this.state.hits });
   
   }  
    event.preventDefault();
   }  
 

   
  
  handleChangePost(event) {
    this.setState({value: event.target.value});
  }
  
  handleChangeComment(event) {
  }
  
  handleSubmitComment (index) {
    return event => {
      event.preventDefault();
        if (event.target[0].value.trim()!==""){       
         var utc = new Date().toJSON(); 
         

         var user = {id: create_UUID(), nameuser: "anonymous", dateCreated: utc}

         var objpost={
             id:create_UUID(),
             text:event.target[0].value,
             user:user,
             dateCreated:utc
         }
         
         event.target[0].value="";

         this.state.hits[index].comments.push(objpost);

         this.setState({ hits:this.state.hits });

        }  
    }
  }
  
  handleChangeSearch(event) {
    this.setState({valuesrch: event.target.value});
  }

  handleSubmitSearch(event) {
    if (event.target[0].value.trim()!=="")     
        this.loadposts(this.state.valuesrch);
    
    event.preventDefault();
  }
  
  handleReset(event) {  
    this.loadposts("");
    
    event.preventDefault();
  }
  
  showcomment(index){
    this.state.displaycomments[index]=2; 
    this.setState({ displaycomments:this.state.displaycomments });
  }
  
  hidecomment(index){
    this.state.displaycomments[index]=1; 
    this.setState({ displaycomments:this.state.displaycomments });
  }  
  
  hideall(index){
    for (let i = 0; i < this.state.todosPerPage; i++) { 
        this.state.displaycomments[i]=1;
    }   
    this.setState({ displaycomments:this.state.displaycomments }); 
   
  }   
  
  Rendpost(){
    const indexOfLastTodo = this.state.currentPage * this.state.todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - this.state.todosPerPage;
    const currentTodos = this.state.hits.slice(indexOfFirstTodo, indexOfLastTodo);
    
    
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.state.hits.length / this.state.todosPerPage); i++) {
      pageNumbers.push(i);
    }   
    
    
    for (let i = 0; i < this.state.todosPerPage; i++) { 
      if (this.state.displaycomments[i]!=2)
        this.state.displaycomments[i]=1;
    }        

        
    
        return (
                
                
        <div>
            <div className="topsrchcolor">
            <form onSubmit={this.handleSubmitSearch} className="form-inline onef">
            <div className="form-group">   
                <label for="email">Search posts:</label>
              <input type="text" value={this.state.valuesrch} className="form-control" onChange={this.handleChangeSearch} />             
              <input type="submit" value="Search" className="btn btn-default" />
              </div>
            </form>
            <form onSubmit={this.handleReset} className="form-inline onef">
              <div className="form-group">
              <input type="submit" value="Reset" className="btn btn-default"/>
              </div>
            </form>
            <div class="clear"></div>
            </div>
            <ul  className="pagination">
            {pageNumbers.map(number =>  
            <li className={ this.state.currentPage==number ? "active" : ""} key={number} id={number} onClick={this.handleClick}>
              {number}
            </li>  


            )}
            </ul> 
            {currentTodos.length==0 ?"No results found":
            <form onSubmit={this.handleSubmitPost}>
              <div class="form-group">
              <label>
                Write a post:
                <textarea value={this.state.value} class="form-control formextarea" onChange={this.handleChangePost} />
              </label>
              </div>
              <input type="submit" value="Submit" className="btn btn-default" />
            </form> 
            }
            <div className="listreactpost">
            <ol>
            {currentTodos.map((hit,index) =>
              <li key={hit.id}><span>{indexOfFirstTodo+index+1}.&nbsp;</span>              
              <div className="pp">
                <div className="postedby">Posted by: <b>{hit.user.nameuser}</b></div><div className="postedby"> on the <i>{hit.dateCreated}</i></div>
                <div class="rghtbutton">
                    <div  className="deletepostcom btn btn-danger" onClick={ () => this.Deletepost(hit.id) }>delete</div>
                    {( this.state.displaycomments[index]==1?
                    <div className="deletepostcom btn btn-success" onClick={ () => this.showcomment(index) }>show {hit.comments.length} comments</div>
                            :
                    <div className="deletepostcom btn btn-warning" onClick={ () => this.hidecomment(index) }>hide</div>

                    )}  
                    <div className="deletepostcom btn btn-primary" onClick={ () => this.hideall(index) }>hide All</div>
                    <div className="clear"></div>
                </div>                
                <div className="clear"></div>
                <div className="txt1">{hit.txt}</div>
                <div className="clear"></div>
                <ul className={ this.state.displaycomments[index]==1 ? "commentsl hide1" : "commentsl show1"} index={index}>          
                {hit.comments.map(hit2 =>
                 <li key={hit2.dateCreated} >
                  <div className="postedby">Commented by: <b>{hit2.user.nameuser}</b></div><div className="postedby"> on the <i>{hit2.dateCreated}</i></div>
                  <div className="clear"></div>
                  <div  className="btn btn-danger" onClick={ () => this.Deletecomment(hit2.dateCreated,indexOfFirstTodo+index) }>delete</div>
                  &nbsp;<span className="norm">{hit2.text} </span>                       
                  </li> 
                )} 
                 <li>
                <form onSubmit={this.handleSubmitComment(indexOfFirstTodo+index)} className="">
                  <div class="form-group">
                  <label>
                    Write a comment:</label>
                    <textarea class="form-control formextarea" onChange={this.handleChangeComment} />

                  <input type="submit" value="Submit" class="btn btn-default" />
                  </div>
                </form>  
                </li>
               </ul>
               </div>
               </li>


          
            )}
            </ol>
            </div>
          </div>
    );
  } 
  


  

 
  
    

    

  render() {

     
    return (            
        this.Rendpost(
        )
    );
  }
}


export default ApplistingPosts;

