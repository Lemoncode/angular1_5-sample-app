# 04 Form Page

In this sample we are going to build up an appoinment edit form.

We are going to take as startup point _03 List Page

# Summary steps:

- Add navigation link.
- Build the component layout.
- Create API plumbing to retrieve data from a given appointment.
- Load the data into the component controller and bind them to the HTML.
- Trigger save on console log.

# Steps to build it

## Prerequisites

Prerequisites, you will need to have nodejs installed in your computer. If you want to follow this step guides you will need to take as starting point sample "03 List Page".

## Steps

### Navigation

Let's start by adding a link navigation, whenever we click on a given appointment
(in the list page) it should jump into the edit appointment entry.

Since we are going to introduce a new route _patient/id_ let's add it into the
router (_app-routes.ts_):

```javascript
$stateProvider.state('patientEdit', <ng.ui.IState>{
    url: '/patient/{patientId:[0-9]{1,8}}',
    views: {
        'content@': { template: '<patient></patient>' }
    }
  }
);
```

Now in _ListPage.ts_ let's create a link that will point to that route:

```html
<td class="hidden-xs">
  {{patient.time}}
  <a ui-sref="patientEdit({patientId: {{patient.id}}})">
  <span class="pull-right glyphicon glyphicon-pencil"
    >
  </span>
  </a>
</td>
```


Let's run _npm start_ from the command line and check that the navigation is being
performed:

```javascript
npm start
```


### Layout

It's time to build the appoitnmend edition layout, let's jump into the _patient/patient.ts_ file and replace
the component template with the following one.

```html
<div class="container-fluid well">
   <div class="row">
     <div class="col-xs-12">
       <h2>Update Appointment</h2>
     </div>
   </div>

   <div class="row">
        <form id="edit-patient-form">
          <div class="col-xs-12 form-group">
            <label>Datos Paciente</label>
          </div>
          <div class="col-sm-6 form-group">
            <label for="dni">DNI</label>
            <input type="text" class="form-control" id="dni"/>
          </div>
          <div class="col-sm-6 form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control" id="name"/>
          </div>
          <div class="col-xs-12 form-group">
            <label>Appointment info</label>
          </div>
          <div class="col-md-6 col-lg-3 form-group">
            <label for="date">Date</label>
            <input type="date" class="form-control" id="date"/>
          </div>
          <div class="col-md-6 col-lg-3 form-group">
            <label for="time">Time</label>
            <input type="time" class="form-control" id="time"/>
          </div>
          <div class="col-md-6 col-lg-3 form-group">
            <label for="specialty">Specialty</label>
            <select id="specialty" class="form-control">
            </select>
          </div>
          <div class="col-md-6 col-lg-3 form-group">
            <label for="doctor">Doctor</label>
            <select id="doctor" class="form-control">
            </select>
          </div>
          <div class="col-xs-offset-10 col-xs-2 form-group">
            <div class="pull-right">
              <button type="button" class="btn btn-success">Guardar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
```

### Data
