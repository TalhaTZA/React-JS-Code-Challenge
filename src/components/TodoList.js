import React from 'react'

import styled from 'styled-components'

import TodoItem from './TodoItem'

const TodoList = ({ items, toggleComplete , listId }) => (
  <Wrapper>
    {listId && items.map(item => {
      const onComplete = e => {
        toggleComplete(item.id,listId)
      }

      return <TodoItem key={item.id} {...item} onComplete={onComplete} />
    })}

    {!listId && items.map((list , id) => {
      
      return <TodoItem key={id} {...list}  />
    })}

  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export default TodoList
