import HouseGriffindor from './HouseGriffindor.jsx'
import HouseHufflepuff from './HouseHufflepuff.jsx'
import HouseRavenclaw from './HouseRavenclaw.jsx'
import HouseSlytherin from './HouseSlytherin.jsx'


export default function Houses() {
  return (
    <div>
      <h1>Houses</h1>
      <div className="flex flex-col gap-4">
        <HouseGriffindor />
        <HouseHufflepuff />
        <HouseRavenclaw />
        <HouseSlytherin />
      </div>
    </div>
  )
}