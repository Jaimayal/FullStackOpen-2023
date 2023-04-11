import { useState } from 'react'

function Button({ handleClick, text }) {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

function Statistics({ good, neutral, bad, all }) {
  if (all !== 0) {
    return (
      <>
        <h2>Statistics</h2>
        <StatisticLine statistic={{ name: "good", value: good }} />
        <StatisticLine statistic={{ name: "neutral", value: neutral }} />
        <StatisticLine statistic={{ name: "bad", value: bad }} />
        <StatisticLine statistic={{ name: "all", value: all }} />
        <StatisticLine statistic={{ name: "average", value: (good - bad) / all }} />
        <StatisticLine statistic={{ name: "positive", value: good / all }} />
      </>
    )
  }

  return (
    <>
      <h2>Statistics</h2>
      <p>No feedback given</p>
    </>
  )
}

function StatisticLine({ statistic }) {
  return (
    <>
      <p>{statistic.name}: {statistic.value}</p>
    </>
  )
}

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
    setAll(all + 1);
  }

  const handleBadCllick = () => {
    setBad(bad + 1);
    setAll(all + 1);
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
    setAll(all + 1);
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={handleGoodClick} text={"good"} />
      <Button handleClick={handleNeutralClick} text={"neutral"} />
      <Button handleClick={handleBadCllick} text={"bad"} />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  )
}

export default App
