import { BiCalendar } from "react-icons/bi";
import Search from "./components/Search";
import AddAppointment from "./components/AddAppointment";
import AppointmentInfo from "./components/AppointmentInfo";
import { useCallback, useEffect, useState } from "react";

function App() {
  let [appointmentList, setAppointmentList] = useState([]);
  let [query, setQuery] = useState("");
  let [sortBy, setSortBy] = useState("petName");
  let [orderBy, setOrderBy] = useState("asc");

  const filteredAppointments = appointmentList
    .filter((item) => {
      return (
        item.petName.toLowerCase().includes(query.toLowerCase()) ||
        item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
        item.aptNotes.toLowerCase().includes(query.toLowerCase())
      );
    })
    .sort((a, b) => {
      let order = orderBy === "asc" ? 1 : -1;
      return a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
        ? -1 * order
        : 1 * order;
    });

  const fetchData = useCallback(() => {
    fetch("./data.json")
      .then((response) => response.json()) //promise
      .then((data) => {
        setAppointmentList(data);
      });
  }, []);

  useEffect(() => {
    //to track data
    fetchData();
  }, [fetchData]);

  return (
    <>
      {/**/}
      <div className="App container mx-auto mt-3 font-thin">
        <h1 className="text-5xl mb-3 ">
          {" "}
          <BiCalendar className="inline-block text-red-400 align-top" /> Your
          Appointment
        </h1>
        <AddAppointment
          onSendAppointment={(myAppointment) =>
            setAppointmentList([...appointmentList, myAppointment])
          }
          lastID={appointmentList.reduce(
            (max, item) => (Number(item.id) > max ? Number(item.id) : max),
            0
          )}
        />
        <Search
          query={query}
          onQueryChange={(myQuery) => setQuery(myQuery)}
          orderBy={orderBy}
          onOrderByChange={(mySort) => setOrderBy(mySort)}
          sortBy={sortBy}
          onSortByChange={(mySort) => setSortBy(mySort)} /* Method */
        />

        <ul className="divide-y divide-grey-200">
          {filteredAppointments.map((appointment) => (
            /*appointment is temp. variable for each one of those items as they come in */
            <AppointmentInfo
              key={appointment.ID}
              appointment={appointment}
              onDeletAppointment={(appointmentID) =>
                setAppointmentList(
                  appointmentList.filter(
                    (appointment) => appointment.id !== appointmentID
                  )
                )
              }
            />
            /* we are passing along the information through this appointment variable receiving it in the AppointmentInfo variable*/
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
