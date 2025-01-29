## Slot-Machine
A terminal based slot machine written in JS

|A|A|A| * 1.5<br>
|B|B|A| * 5.0<br>
|C|C|A| * 1.5<br>

## Learnings
- Looping through an Object using Object.entries and accessing its key-value pair
```bash
for ( const [symbol, count] of Object.entries(SYMBOLS_COUNT) ) {
    for (let i=0; i<count; i++) {
        symbols.push(symbol);
    }
}
```
- Using the spread operator(...) -> It is used to create a shallow copy of arrays, objects and strings.
```bash
const reelSymbols = [...symbols];
```
- transposing a matrix