import DetailView from './components/DetailView';
import React, { useState, useRef } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Tree } from 'antd';


const treeData1 = [
  {
    title: 'Use Case',
    key: '0-0',
    children: [
      {
        title: 'A',
        key: '0-0-0',
        children: [
          {
            title: 'leaf1',
            key: '0-0-0-0',
            content: 'Display content of leaf1'
          },
          {
            title: 'leaf2',
            key: '0-0-0-1',
            content: 'Display content of leaf2'
          },
          {
            title: 'leaf3',
            key: '0-0-0-2',
            content: 'Display content of leaf3'
          },
        ],
      },
      {
        title: 'B',
        key: '0-0-1',
        children: [
          {
            title: 'leaf4',
            key: '0-0-1-0',
            content: 'Display content of leaf4'
          },
        ],
      },
      {
        title: 'C',
        key: '0-0-2',
        children: [
          {
            title: 'leaf5',
            key: '0-0-2-0',
          },
          {
            title: 'leaf6',
            key: '0-0-2-1',
          },
        ],
      },
    ],
  },
];

const treeData2 = [
  {
    title: "Results",
    key: "1",
    children: [
      {
        title: 'Queue-Informed RM',
        key: '1-1',
        children: [
          {
            title: 'Mobility',
            key: '1-1-1',
            children: [
              {
                title: 'Average Travel Speed',
                key: '1-1-1-1',
                content: 'Display content of Average Travel Speed'
              }
            ]
          },
          {
            title: 'Safety',
            key: '1-1-2',
            children: [
              {
                title: 'Average Accidents',
                key: '1-1-2-1',
                content: 'Display content of Average Accidents Number'
              }
            ]
          }
        ]
      },
      {
        title: 'Incident-Aware RM',
        key: '1-2'
      }
    ]
  }
];

const treeData3 = [
  {
    title: "Results",
    key: "1",
    children: [
      {
        title: 'Queue-Informed RM',
        key: '1-1',
        chileren: [
          {
            title: "Mobility",
            key: "1-1-1",
            children: [{ title: "Average Travel Time", key: "1-1-1", children: [] },
            { title: "Average Travel Speed", key: "1-1-2" }]
          },
          {
            title: "Efficiency",
            key: "1-1-2",
            children: [{ title: "Sub-subcategory 1.2.1", key: "1-2-1" }]
          },
          {
            title: "Reliability",
            key: "1-1-3",
            children: [{ title: "Sub-subcategory 1.3.1", key: "1-3-1" }]
          },
          {
            title: "Safety",
            key: "1-1-4",
            children: [{ title: "Sub-subcategory 1.4.1", key: "1-4-1" }]
          }
        ]
      },
      {
        title: 'Incident-Aware RM',
        key: '1-2',
        chileren: [
          {
            title: "Mobility",
            key: "1-2-1",
            children: [{ title: "Average Travel Time", key: "1-1-1" },
            { title: "Average Travel Speed", key: "1-1-2" }]
          },
          {
            title: "Efficiency",
            key: "1-2-2",
            children: [{ title: "Sub-subcategory 1.2.1", key: "1-2-1" }]
          },
          {
            title: "Reliability",
            key: "1-2-3",
            children: [{ title: "Sub-subcategory 1.3.1", key: "1-3-1" }]
          },
          {
            title: "Safety",
            key: "1-2-4",
            children: [{ title: "Sub-subcategory 1.4.1", key: "1-4-1" }]
          }
        ]
      }
    ]
  }
];


const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [useCase, setUseCase] = useState(true)
  const [expandKeys, setExpandKeys] = useState([])
  const keyLevelMap = useRef(new Map()); //记录每一个展开节点的level

  //同时只展开一个部门/事业处/公司
  const onExpand = ((key, e) => {
    console.log(e);
    //e.node.pos第一层0-0，第二层0-0-0，第三层0-0-0-0……
    //e.expanded展开/收起 我记录旧值的样子好像小丑……
    if (e.expanded) {
      const level = e.node.pos.split('-').length - 1;
      keyLevelMap.current.set(e.node.key, level); //位置
      const filterKey = [];
      key.map((item) => {
        if (keyLevelMap.current.get(item) != level) {
          filterKey.push(item);
        }
      });
      filterKey.push(e.node.key); //加上自身
      setExpandKeys(filterKey);
    } else {
      setExpandKeys(key);
    }
  })

  const onSelect = ((_, info) => {
    setSelectedCategory(info.node.content)
  })
  const handleClickA = () => {
    setUseCase(true)
    setSelectedCategory(null)
  }

  const handleClickB = () => {
    setUseCase(false)
    setSelectedCategory(null)
  }

  return (
    <div className='App'>

      {/* <h1 className='App-header '>Introduction - Test</h1> */}
      <button className='btn' onClick={handleClickA}>Switch To Use Case</button>
      <button className='btn' onClick={handleClickB}>Switch To Results</button>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, padding: '50px' }}>
          {useCase ? 
          <Tree
            style={{ height: 200, overflow: 'auto ', width: 300 }}
            showLine
            switcherIcon={<DownOutlined />}
            treeData={treeData1}
            expandedKeys={expandKeys}
            onExpand={onExpand}
            onSelect={onSelect}
            defaultExpandAll={false} // Expand all level
          /> :
            <Tree
              style={{ height: 200, overflow: 'auto ', width: 300}}
              showLine
              switcherIcon={<DownOutlined />}
              treeData={treeData2}
              expandedKeys={expandKeys}
              onExpand={onExpand}
              onSelect={onSelect}
              defaultExpandAll={false} // Expand all level
            />}
        </div>
        <div style={{ flex: 1, padding: '50px' ,height: 200, overflow: 'auto ', width: 300}}>
          <DetailView selectedCategory={selectedCategory} />
        </div>
      </div>
    </div>
  );
};
export default App;