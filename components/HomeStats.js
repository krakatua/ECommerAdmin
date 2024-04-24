import axios from "axios"
import { useEffect, useState } from "react"
import Spinner from "./Spinner"


export default function Homestats() {

    const [orders, setOrders] = useState([])
    const [isloading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        axios.get('/api/orders').then((response) => {
            const data = response?.data
            setOrders(data)
            setIsLoading(false)
        })
    }, [])

    function orderstotal(orders) {
        let sum = 0;

        orders.forEach(o => {
            if (!o.paid) {
                const {line_items} = o;
                line_items.forEach(l => {
                    const lineSum = l?.quantity * l?.price_data?.unit_amount / 100;
                    sum += lineSum;
                })
            }
        })
        

        return new Intl.NumberFormat('en-US').format(sum);
    }

    if (isloading) {
        return (
            <div className="my-4">
                <Spinner fullWidth={true}/>
            </div>
        )
    }

    const ordersToday = orders.filter(o => {
        const orderDate = new Date(o.createdAt)
        const today = new Date()
        return orderDate.getDate() === today.getDate()
    }    
    )

    const ordersThisWeek = orders.filter(o => {
        const orderDate = new Date(o.createdAt)
        const today = new Date()
        return orderDate.getDate() >= today.getDate() - 7
    }
    );

    const ordersThisMonth = orders.filter(o => {
        const orderDate = new Date(o.createdAt)
        const today = new Date()
        return orderDate.getMonth() === today.getMonth()
    }
    );


    return (
        <div className=" ">
            <h2>Orders</h2>
            <div className="tiles-grid">
                <div className="tile">
                    <h3 className="tile-header">Today</h3>
                    <div className="tile-number">{ordersToday?.length}</div>
                    <div className="tile-desc">{ordersToday?.length} orders today</div>
                </div>
                <div className="tile">
                    <h3 className="tile-header">This Week</h3>
                    <div className="tile-number">{ordersThisWeek?.length}</div>
                    <div className="tile-desc">{ordersThisWeek?.length} orders today</div>
                </div>
                <div className="tile">
                    <h3 className="tile-header">This Month</h3>
                    <div className="tile-number">{ordersThisMonth?.length}</div>
                    <div className="tile-desc">{ordersThisMonth?.length} orders today</div>
                </div>
            </div>
            <h2>Revenue</h2>
            <div className="tiles-grid">
                <div className="tile">
                    <h3 className="tile-header">Today</h3>
                    <div className="tile-number">${orderstotal(ordersToday)}</div>
                    <div className="tile-desc">{ordersToday?.length} orders today</div>
                </div>
                <div className="tile">
                    <h3 className="tile-header">This Week</h3>
                    <div className="tile-number">${orderstotal(ordersThisWeek)}</div>
                    <div className="tile-desc">{ordersThisWeek?.length} orders this week</div>
                </div>
                <div className="tile">
                    <h3 className="tile-header">This Month</h3>
                    <div className="tile-number">${orderstotal(ordersThisMonth)}</div>
                    <div className="tile-desc">{ordersThisMonth?.length} orders this month</div>
                </div>
            </div>
            
        </div>
    )
}