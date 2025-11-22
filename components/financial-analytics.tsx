"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import type { Transaction } from "@/lib/types"

interface FinancialAnalyticsProps {
  money: number
  transactions: Transaction[]
}

export function FinancialAnalytics({ money, transactions }: FinancialAnalyticsProps) {
  const totalSpent = transactions.filter((t) => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0)
  const totalEarned = transactions.filter((t) => t.amount > 0).reduce((sum, t) => sum + t.amount, 0)

  const expensesByCategory = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => {
      const category = t.description
      if (!acc[category]) {
        acc[category] = 0
      }
      acc[category] += Math.abs(t.amount)
      return acc
    }, {} as Record<string, number>)

  const pieData = Object.entries(expensesByCategory).map(([name, value]) => ({
    name,
    value,
  }))

  const incomeByCategory = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => {
      const category = t.description
      if (!acc[category]) {
        acc[category] = 0
      }
      acc[category] += t.amount
      return acc
    }, {} as Record<string, number>)

  const incomeData = Object.entries(incomeByCategory).map(([name, value]) => ({
    name,
    value,
  }))

  const last10Transactions = transactions.slice(0, 10).reverse()
  const balanceOverTime = last10Transactions.reduce((acc, t, index) => {
    const prevBalance = index === 0 ? money - t.amount : acc[index - 1].balance - t.amount
    acc.push({
      transaction: index + 1,
      balance: prevBalance,
    })
    return acc
  }, [] as { transaction: number; balance: number }[])

  balanceOverTime.push({ transaction: balanceOverTime.length + 1, balance: money })

  const COLORS = ["#8b5cf6", "#06b6d4", "#f59e0b", "#10b981", "#ef4444", "#ec4899", "#6366f1", "#14b8a6"]

  const savingsRate = totalEarned > 0 ? ((money / totalEarned) * 100).toFixed(1) : "0"
  const spendingRate = totalEarned > 0 ? ((totalSpent / totalEarned) * 100).toFixed(1) : "0"

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>📊</span>
            Financial Analytics Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-lg border bg-gradient-to-br from-secondary/20 to-secondary/5 p-4">
              <div className="text-sm font-medium text-muted-foreground">Current Balance</div>
              <div className="mt-2 text-2xl font-bold text-secondary">${money.toFixed(2)}</div>
              <div className="mt-1 text-xs text-muted-foreground">Available funds</div>
            </div>

            <div className="rounded-lg border bg-gradient-to-br from-primary/20 to-primary/5 p-4">
              <div className="text-sm font-medium text-muted-foreground">Total Earned</div>
              <div className="mt-2 text-2xl font-bold text-primary">${totalEarned.toFixed(2)}</div>
              <div className="mt-1 text-xs text-muted-foreground">From chores</div>
            </div>

            <div className="rounded-lg border bg-gradient-to-br from-destructive/20 to-destructive/5 p-4">
              <div className="text-sm font-medium text-muted-foreground">Total Spent</div>
              <div className="mt-2 text-2xl font-bold text-destructive">${totalSpent.toFixed(2)}</div>
              <div className="mt-1 text-xs text-muted-foreground">On pet care</div>
            </div>

            <div className="rounded-lg border bg-gradient-to-br from-accent/20 to-accent/5 p-4">
              <div className="text-sm font-medium text-muted-foreground">Savings Rate</div>
              <div className="mt-2 text-2xl font-bold text-accent-foreground">{savingsRate}%</div>
              <div className="mt-1 text-xs text-muted-foreground">Of income saved</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Balance History</CardTitle>
          </CardHeader>
          <CardContent>
            {balanceOverTime.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={balanceOverTime}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="transaction" label={{ value: "Transactions", position: "insideBottom", offset: -5 }} />
                  <YAxis label={{ value: "Balance ($)", angle: -90, position: "insideLeft" }} />
                  <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                  <Line type="monotone" dataKey="balance" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-[250px] items-center justify-center text-muted-foreground">
                No transaction history yet
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Income Sources</CardTitle>
          </CardHeader>
          <CardContent>
            {incomeData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={incomeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} fontSize={12} />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                  <Bar dataKey="value" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-[250px] items-center justify-center text-muted-foreground">
                Complete chores to see income data
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Spending Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name.split(" ")[0]} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-[250px] items-center justify-center text-muted-foreground">
                No expenses yet
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Financial Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg bg-muted p-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <span>💡</span>
                  Spending Analysis
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  You're spending {spendingRate}% of your earnings on pet care.
                  {Number.parseFloat(spendingRate) > 80
                    ? " Try to save more by completing additional chores!"
                    : " Great job maintaining a healthy budget!"}
                </p>
              </div>

              <div className="rounded-lg bg-muted p-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <span>🎯</span>
                  Budget Goal
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {money < 50
                    ? "Your balance is getting low. Complete more chores to earn money!"
                    : money < 100
                      ? "You're doing well! Keep earning to build a safety cushion."
                      : "Excellent! You have a healthy balance for pet care."}
                </p>
              </div>

              <div className="rounded-lg bg-muted p-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <span>📈</span>
                  Transaction Count
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  You've made {transactions.length} transaction{transactions.length !== 1 ? "s" : ""} so far.
                  {transactions.length > 10
                    ? " You're actively managing your pet care budget!"
                    : " Keep tracking your expenses and income!"}
                </p>
              </div>

              <div className="rounded-lg bg-muted p-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <span>💰</span>
                  Financial Health
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {totalEarned > totalSpent
                    ? "You're earning more than you're spending - excellent financial management!"
                    : totalEarned === totalSpent
                      ? "You're breaking even. Try to save a portion of your earnings."
                      : "You're spending more than earning. Focus on completing chores!"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
