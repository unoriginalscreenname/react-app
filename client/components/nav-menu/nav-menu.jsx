SideNav = React.createClass({
  getInitialState() {
    return {
      open:true
    }
  },
  close(){
    this.setState({
      open:!this.state.open
    })
  },
  render(){
    return(
      <div id="side-nav-layout" className={this.state.open ? 'null' : 'closed'}>

        <div className="side-nav">
          <div className="side-nav-menu p-a">
            <NavMenu />
          </div>
          <div className="side-nav-footer">
            <button onClick={this.close} className="btn btn-block btn-secondary-outline"><i className={this.state.open ? 'fa fa-chevron-left' : 'fa fa-chevron-right'}></i></button>
          </div>
        </div>
    </div>
    )
  }
})

// App component - represents the whole app
NavMenu = React.createClass({
  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  // Loads items from the Tasks collection and puts them on this.data.tasks
  getMeteorData() {
    return {
      projects: Projects.find({},{sort:{created:-1}}).fetch(),
    }
  },



  changePath(id) {
    FlowRouter.go('project-details', {projectId:id, test:'test'});
  },


  render() {
    return <div className="layout layout-column layout-fill">
    <ul className="list-group">
      {this.data.projects.map((project)=>{
        return <NavMenuItem key={project._id} project={project}/>
      })}
    </ul>
    <br />

    <a href="/new-project" className="btn btn-outline-secondary">New Project</a>

    </div>

  }
});
//<ToggleAddProjectForm />

ToggleAddProjectForm = React.createClass({
  getInitialState(){
    return {
      show:false,
      name:''
    }
  },

  mixins:[FormFocusMixin],

  toggleForm() {
    this.setState({
      show:!this.state.show
    });
  },
  handleChange(evt){
    this.setState({
      name:evt.target.value
    });
  },

  createProject() {
  Meteor.call('createProject', this.state.name, function(err, result){
    FlowRouter.go('/projects/'+result);
  })
    this.setState({
      show:false,
      name:''
    });
  },

  handleKeyEnter(){
    this.createProject();
  },
  handleKeyEscape(){
    this.toggleForm();
  },
  renderButton() {
    return (
      <button onClick={this.toggleForm} className="btn btn-secondary-outline btn-block"><i className="fa fa-plus"></i> New Project</button>
    )
  },
  renderForm() {
    return (
      <div>
        <fieldset className="form-group">
          <input ref="editFocus" onBlur={this.handleKeyEscape} onKeyUp={this.handleKeyUp} type="text" value={this.state.name} onChange={this.handleChange} className="form-control" placeholder="Project Name" />
        </fieldset>
        <fieldset className="form-group">
          <button onClick={this.createProject} className="btn btn-success-outline btn-block"><i className="fa fa-plus"></i> Create Project</button>
        </fieldset>
      </div>
    )
  },
  render(){
    return <div>
      {this.state.show ? this.renderForm() : this.renderButton()}
    </div>
  }
})

//<span className="label label-default label-pill pull-right">14</span>
// href={'/projects/'+project._id}