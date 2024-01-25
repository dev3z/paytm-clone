
function App() {

  return (
    <div>
      var personSchema = new Schema({
    name: { type: String, default: 'anonymous' },
    age: { type: Number, min: 18, index: true },
    bio: { type: String, match: /[a-zA-Z ]/ },
    date: { type: Date, default: Date.now },
});
    </div>
  )
}

export default App
