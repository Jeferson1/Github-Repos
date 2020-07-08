function getGithubUserRepo(){

    const bodyElement = document.querySelector('.main')
    const bioElement = document.querySelector('.bio')
    const repos = document.querySelector('.repos')

    const list = document.querySelectorAll('ul')
    const text = document.querySelector('h3')
    const image = document.querySelector('img')

    if(list.length > 0){
        bioElement.removeChild(list[0])
        repos.removeChild(list[1])
    }

    if(text !== null){
        bodyElement.removeChild(text)
    }

    if(image !== null){
        bodyElement.removeChild(image)
    }

    const message = document.createElement('h3')
    message.innerText = 'Carregando...'

    bodyElement.appendChild(message)
    
    const inputValue = document.querySelector('input').value

    axios.get(`https://api.github.com/users/${inputValue}`)
    .then(function(response){
        const github = response
         
        bodyElement.removeChild(message)

        const imgElement = document.createElement('img')
        imgElement.setAttribute('src', github.data.avatar_url)

        bodyElement.appendChild(imgElement)

        const listElement = document.createElement('ul')
        
        bioElement.appendChild(listElement)

        const bio = [
            github.data.name,
            github.data.blog,
            github.data.company,
            github.data.location
        ]
        
        for(i = 0; i < bio.length;  i++){
            
            const bioElement = document.createElement('li')

            if(bio[i] !== null){
                const bioProperty = document.createTextNode(bio[i])
                
                listElement.appendChild(bioElement)
            
                bioElement.appendChild(bioProperty)
            }    
    
        }

        bodyElement.className = 'main main-backcolor'

    })
    .catch(function(error){
        if(text !== null){
            bodyElement.removeChild(text)
        }
        if(image !== null){
            bodyElement.removeChild(image)
        }
        message.innerText = 'Usuário não existe'
        bodyElement.appendChild(message)

        console.warn(error)
    })

    axios.get(`https://api.github.com/users/${inputValue}/repos`)
    .then(function(response){
        const githubRep = response
        
        const listElementRepos = document.createElement('ul')
        
        repos.appendChild(listElementRepos)

        for(j = 0; j < githubRep.data.length;  j++){
            
            const repos = document.createElement('li')

            const repoName = document.createTextNode(githubRep.data[j].name)
            
            listElementRepos.appendChild(repos)
            
            repos.appendChild(repoName)
        }

    })
    .catch(function(error){
        if(list.length > 0){
            bodyElement.removeChild(list[1])
        }
        message.innerText = 'Não foram encontrados repositórios'
        bodyElement.appendChild(message)

        console.warn(error)
    })

}
