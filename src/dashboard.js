import React from 'react';
import HighlightTable from "./components/table";
export default function Dashboard() {
    return (
        <div className="dashboard-grid">
            <HighlightTable type="highlight"/>
            <HighlightTable type="buyers"/>
            <HighlightTable type="countries"/>
            <HighlightTable type="income"/>
        </div>
    )
}
