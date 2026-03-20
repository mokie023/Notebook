import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Callback from "./pages/Callback";
import Dashboard from "./pages/Dashboard";

//note: this file is the main entry point of the application, it defines the routes and the components that will be rendered for each route. 
import Notes from "./pages/Notes";
import CreateNote from "./pages/CreateNote";
import ViewNote from "./pages/ViewNote";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} /> // Route for the home page
      <Route path="/login" element={<Login />} /> // Route for the login page
      <Route path="/register" element={<Register />} /> // Route for the registration page
      <Route path="/auth/callback" element={<Callback />} /> // Route for handling the authentication callback after login/register
      <Route path="/dashboard" element={<Dashboard />} /> // Route for the dashboard page
      <Route path="/notes" element={<Notes />} /> // Route for listing all notes
      <Route path="/notes/create" element={<CreateNote />} /> // Route for creating a new note
      <Route path="/notes/:id" element={<ViewNote />} /> // Dynamic route for viewing a specific note by its ID
    </Routes>
  );
}