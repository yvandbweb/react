import React, { Component } from 'react';
import Moment from 'react-moment';

//const API = "http://localhost:8585/symfonywebsrv/public/index.php/userandcomsandposts";
const API = "https://ydbweb.com/symfonywebsrv/public/index.php/userandcomsandposts";
//const API = 'http://localhost:8080/userandcomsandposts';
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

class ApplistingUsers extends Component {
    
  constructor(props) {
    super(props);
    

    this.state = {
      hits: [], displaycomments:[],displayposts:[],currentPage:1, todosPerPage:6,valuesrch: ''
      ,activeIndex: null,loading:true
    };
    
    
    const displaycomments = [];
    
    
    this.handleClick = this.handleClick.bind(this);
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
    this.handleSubmitSearch = this.handleSubmitSearch.bind(this);   
    this.handleReset = this.handleReset.bind(this); 
          
          
  }  
  
  loadposts(srch){
    this.setState({ loading: true });
    fetch(API + DEFAULT_QUERY+srch)
      .then(response => response.json())
      .then(data => this.setState({ hits: data ,loading: false}));  
      
    for (let i = 0; i < this.state.todosPerPage; i++) { 
        this.state.displaycomments[i]=1;
    }
    
    for (let i = 0; i < this.state.todosPerPage; i++) { 
        this.state.displayposts[i]=1;
    }    
    
    //this.setState({valuesrch:""})
      
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
    this.hideall(index);   
    this.state.displaycomments[index]=2; 
    this.setState({ displaycomments:this.state.displaycomments });
  }
  
  hidecomment(index){
    this.hideall(index);      
  }  
  
  showposts(index){
    this.hideall(index);
    this.state.displayposts[index]=2; 
    this.setState({ displayposts:this.state.displayposts });
  }
  
  hideposts(index){
    this.hideall(index);   
  }    
  
  hideall(index){
    for (let i = 0; i < this.state.todosPerPage; i++) { 
        this.state.displaycomments[i]=1;
    }  
    
    for (let i = 0; i < this.state.todosPerPage; i++) { 
        this.state.displayposts[i]=1;
    }     
    this.setState({ displaycomments:this.state.displaycomments }); 
    this.setState({ displayposts:this.state.displayposts });
   
  }  
  
  LoadingSpinner(){
      return (
              <div className="overlay"><img src={process.env.PUBLIC_URL + '/images/200.gif'} alt="Logo" /></div>
      );
  }
  
  Renduser(){
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
    
    for (let i = 0; i < this.state.todosPerPage; i++) { 
      if (this.state.displayposts[i]!=2)
        this.state.displayposts[i]=1;
    }     

    
        return (
                
                
            <div>
            <div className="topsrchcolor">
            <form onSubmit={this.handleSubmitSearch} className="form-inline onef">
            <div className="form-group">   
                <label for="email">Search users&nbsp;</label>
              <input type="text" value={this.state.valuesrch} className="form-check-input" onChange={this.handleChangeSearch} />             
              <input type="submit" value="Search" className="btn form-check-input btn-default" />
              <input type="button" value="Reset" onClick={ this.handleReset } className="btn form-check-input btn-default"/>
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
            { this.state.hits.length==0 ? "no results found": ""}
            <div className="listreactpost">      
            <ul className="list-group">
            {currentTodos.map((hit,index) =>
              <li className="list-group-item d-flex justify-content-between align-items-center ppfirst usersli" key={hit.id}>
              <div className="pp">
                <div className="ppfirst">
                    <div className="postedby"><b>{hit.nameuser}</b></div><div className="postedby"> &nbsp;joinded on the <i><Moment format="DD-MM-YYYY HH:mm">{hit.dateCreated}</Moment></i></div>
                    <div class="leftbutton">
                        {( this.state.displaycomments[index]==1?
                        <div className="deletepostcom btn btn-success" onClick={ () => this.showcomment(index) }>show {hit.comments.length} Comments</div>
                                :
                        <div className="deletepostcom btn btn-warning" onClick={ () => this.hidecomment(index) }>hide Comments</div>
                        )}  
                        {( this.state.displayposts[index]==1?
                        <div className="deletepostcom btn btn-info" onClick={ () => this.showposts(index) }>show {hit.posts.length} Posts</div>
                                :
                        <div className="deletepostcom btn btn-warning" onClick={ () => this.hideposts(index) }>hide Posts</div>
                        )}   
                        <div className="deletepostcom btn btn-primary" onClick={ () => this.hideall(index) }>hide All</div>
                        <div className="clear"></div>
                    </div>
                </div>
                <div className="clear"></div>
                <ul className={ this.state.displaycomments[index]==1 ? "commentsl hide1" : "commentsl show1"} index={index}>          
                {hit.comments.map(hit2 =>
                 <li className="userscomment" key={hit2.dateCreated} >
                  <div className="postedby">Commented by: <b>{hit2.user.nameuser}</b></div><div className="postedby"> on the <i><Moment format="DD-MM-YYYY HH:mm">{hit2.dateCreated}</Moment></i></div>
                  <div className="clear"></div>
                  &nbsp;<span className="norm">{hit2.text} </span>                       
                  </li> 
                )} 
               </ul>           
                <ul className={ this.state.displayposts[index]==1 ? "commentsl hide1" : "commentsl show1"} index={index}> 
                {hit.posts.map(hit2 =>
                 <li className="userscomment" key={hit2.dateCreated} >
                  <div className="postedby">Posted by: <b>{hit2.user.nameuser}</b></div><div className="postedby"> on the <i><Moment format="DD-MM-YYYY HH:mm">{hit2.dateCreated}</Moment></i></div>
                  <div className="clear"></div>
                  &nbsp;<span className="norm">{hit2.txt} </span>                       
                  </li> 
                )} 
               </ul>                    
               </div>
               </li>          
            )}
            </ul>
            </div>
          </div>
    );
  } 
  


  

 
  
    

    

  render() {

     
    return (
            <div>
            {this.state.loading ? this.LoadingSpinner() : this.Renduser()}
            </div>
    );
  }
}


export default ApplistingUsers;
