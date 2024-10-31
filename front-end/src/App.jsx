import { Route, Routes } from 'react-router-dom'; // Importa Router correctamente
import { UserProvider } from './Context/UserContext';
import {
  Home,
  Inscripciones,
  FormNewBeca,
  FormRenewalScholarship,
  Scholarships,
  EntitySport,
  Sport,
  Login,
  Profile,
  ChangePassword,
  Request,
  Dashboard,
  Approved,
  Reject,
  Pending,
  Province,
  Localities,
  NewScholarship,
  NewProvince,
  EditProvince,
  NewSport,
  EditSport,
  AllSports,
  NewLocality,
  EditLocality,
  AllLocalities,
  NewSchool,
  EditSchool,
  AllSchools,
  AllScholarships,
  EditScholarship,
  NewSportsEntity,
  EditSportsEntity,
  AllSportsEntities,
  EditRequest
} from './pages';

import Layout from './components/Layout';

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="registrations">
            <Route index element={<Inscripciones />} />
            <Route path="form/:id" element={<FormNewBeca />} />
            <Route path="form-renewal-scholarship" element={<FormRenewalScholarship />} />
          </Route>
          <Route path="scholarships">
            <Route index element={<Scholarships />} />
            <Route path='entity/:id' element={<EntitySport />} />
            <Route path='sport/:id' element={<Sport />} />
          </Route>
          <Route path='user'>
            <Route path='login' element={<Login />} />
            <Route path='profile' element={<Profile />} />
            <Route path='change-password' element={<ChangePassword />} />
            <Route path='requests' element={<Request />} />
            <Route path='edit-request/:id' element={<EditRequest />} />
          </Route>
          <Route path='dashboard'>
            <Route index element={<Dashboard />} />
            <Route path='scholarships'>
              <Route path='approved' element={<Approved />} />
              <Route path='reject' element={<Reject />} />
              <Route path='pending' element={<Pending />} />
            </Route>
            <Route path='province'>
              <Route index element={<Province />} />
              <Route path='new' element={<NewProvince />} />
              <Route path='edit/:id' element={<EditProvince />} />
            </Route>
            <Route path='localities'>
              <Route index element={<Localities />} />
              <Route path='new' element={<NewLocality />} />
              <Route path='all' element={<AllLocalities />} />
              <Route path='edit/:id' element={<EditLocality />} />
            </Route>
            <Route path='school'>
              <Route path='new' element={<NewSchool />} />
              <Route path='all' element={<AllSchools />} />
              <Route path='edit/:id' element={<EditSchool />} />
            </Route>
            <Route path='sports'>
              <Route path='new' element={<NewSport />} />
              <Route path='all' element={<AllSports />} />
              <Route path='edit/:id' element={<EditSport />} />
              <Route path='detail/:id' element={<Sport />} />
            </Route>
            <Route path='scholarship'>
              <Route index element={<AllScholarships />} />
              <Route path='new' element={<NewScholarship />} />
              <Route path='edit/:id' element={<EditScholarship />} />
            </Route>
            <Route path='sports-entities'>
              <Route path='new' element={<NewSportsEntity />} />
              <Route path='all' element={<AllSportsEntities />} />
              <Route path='edit/:id' element={<EditSportsEntity />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </UserProvider>
  );
}

export default App;
