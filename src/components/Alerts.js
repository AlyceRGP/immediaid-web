import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from "react-bootstrap";

export const Alerts = () => {

    const alertsArr = [
        {
            id: 1,
            type: "Fire",
            dateTime: "3/13/2025, 5:28:29 PM",
            name: "Dela Cruz, Juan C.",
            address: "Lipa City",
            location: "12.1234567, 123.1234567",
            status: "Resolved"
        },
        {
            id: 2,
            type: "Medical Emergency",
            dateTime: "3/24/2025, 3:25:21 PM",
            name: "Mercado, Juana D.",
            address: "Lipa City",
            location: "13.9876543, 124.9876543",
            status: "Resolved"
        },
        {
            id: 3,
            type: "Flood",
            dateTime: "3/27/2025, 9:56:37 AM",
            name: "Alvares, Justine H.",
            address: "Lipa City",
            location: "14.456789, 125.456789",
            status: "Resolved"
        }
    ];

    return (
        <div className="p-4">
            <h1 className="text-center pb-3">SOS Alerts</h1>

            <Table striped hover>
            <thead>
                <tr>
                <th>ID</th>
                <th>Emergency Type</th>
                <th>Date & Time</th>
                <th>Name</th>
                <th>Address</th>
                <th>Location</th>
                <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {alertsArr.slice(0).reverse().map((alert) => (
                <tr key={alert.id}>
                <td>{alert.id}</td>
                <td>{alert.type}</td>
                <td>{alert.dateTime}</td>
                <td>{alert.name}</td>
                <td>{alert.address}</td>
                <td>{alert.location}</td>
                <td>{alert.status}</td>
                </tr>
                ))}
            </tbody>
            </Table>
        </div>
    )
}