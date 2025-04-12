export default function GetHihgest() {
  
  const numbers:number[] = [1, 2, 3, 4, 5];
  const highestNumber = Math.max(...numbers);
  return(

    <div>
      <h1>Highest Number</h1>
      <p>The highest number is: {highestNumber}</p>
      <p>Numbers: {numbers.join(', ')}</p>
    </div>
  );
}