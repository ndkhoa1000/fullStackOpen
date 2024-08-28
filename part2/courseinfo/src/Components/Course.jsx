const Header = ({course}) => {
    return (
      <h3>{course}</h3>
    )
  }
  const Part = ({name, ex}) =>{
    return (
      <p>{name} {ex}</p>
    )
  }
  const Content = ({parts}) => {
    return (
      <>
        {parts.map(part => 
          <Part key={part.id} name={part.name} ex={part.exercises}/>
         )}
      </>
    )
  }
  
  const Total = ({parts}) => {
    const sum = parts.reduce((acc,part) => {return acc + part.exercises},0)
    return(
      <strong>total of {sum} excercises</strong>
    )
  }
  const Course = ({course}) => {
      return(
        <>
          <Header course={course.name}/>
          <Content parts={course.parts}/>
          <Total parts={course.parts}/>
        </>
      )
  }

export default Course