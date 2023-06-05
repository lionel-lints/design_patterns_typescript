import { Permission, PermissionWithGroup, Category } from './Composite';

type Data = {
    id: string;
    displayText: string;
    category: string;
    isChecked: boolean;
    requiredPermissionIds: string[];
}
const testData: Data[] = [
  {
    id: '1',
    displayText: 'confidential postings',
    category: 'postings',
    isChecked: true,
    requiredPermissionIds: ['3']
  },
  {
    id: '2',
    displayText: 'non confidential postings',
    category: 'postings',
    isChecked: true,
    requiredPermissionIds: ['3']
  },
  {
    id: '3',
    displayText: 'parent permission for postings',
    category: 'postings',
    isChecked: true,
    requiredPermissionIds: []
  },
  {
    id: '4',
    displayText: 'manage automation',
    category: 'automations',
    isChecked: true,
    requiredPermissionIds: ['3']
  },
  {
    id: '5',
    displayText: 'manage archive reasons',
    category: 'pipeline',
    isChecked: true,
    requiredPermissionIds: ['3', '4']
  },
  {
    id: '6',
    displayText: 'manage automation',
    category: 'automations',
    isChecked: true,
    requiredPermissionIds: []
  },
]

const groupByCategories = (data: Data[]) => {
  return data.reduce((accum: Record<string, Data[]>, curr: Data) => {
    if (accum[curr.category]) {
      accum[curr.category].push(curr);
    } else {
      accum[curr.category] = [curr];
    }
    return accum;
  },{});
}

const main = () => {
  console.log(groupByCategories(testData));
}
main()

// const buildDependencyHash = (data) => {
//   return data.reduce((accum, curr) => {
//     if(accum[curr.id] === undefined){
//       accum[curr.id] = { node: curr, children:[] };
//     } else {
//       accum[curr.id].node = curr;
//     }
//     curr.requiredPermissionIds.forEach((id) => {
//       if(accum[id] !== undefined){
//         accum[id].children.push(curr.id);
//       } else {
//         accum[id] = [curr.id];
//       }
//     });
//     return accum;
//   },{})
// }

// const buildGraph = (hash, data) => {
//   let visted = new Array(data.length).fill(false);
  

// }

export { main }
