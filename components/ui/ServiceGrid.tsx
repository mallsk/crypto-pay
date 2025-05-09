import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plane, Bus, Smartphone, Receipt, ShoppingBag, Tv, Zap, Coffee } from "lucide-react"

export default function ServiceGrid() {
  const services = [
    { icon: <Plane className="h-6 w-6" />, name: "Flight Tickets" },
    { icon: <Bus className="h-6 w-6" />, name: "Bus Tickets" },
    { icon: <Smartphone className="h-6 w-6" />, name: "Mobile Recharge" },
    { icon: <Receipt className="h-6 w-6" />, name: "Pay Bills" },
    { icon: <ShoppingBag className="h-6 w-6" />, name: "Shopping" },
    { icon: <Tv className="h-6 w-6" />, name: "Entertainment" },
    { icon: <Zap className="h-6 w-6" />, name: "Electricity" },
    { icon: <Coffee className="h-6 w-6" />, name: "Food & Drinks" },
  ]

  return (
    <Card className="mt-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Services</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2 dark:bg-emerald-950 dark:text-emerald-400">
                {service.icon}
              </div>
              <span className="text-xs text-center">{service.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}