beforeEach(() => {
		cy.visit('http://storybook.b360-dev.autodesk.com/current/iframe.html?id=dropdowntree--default');
		
		cy.log('Open drop down');
		cy.get('div.DropdownTree')
	      .click();
	})
describe('Main functionality', () => {
	

  it('Expand and collapse drop down menu', () => {
	  
		cy.log('Verify dropdown is displayed');
		cy.get('div.TreeContainer')
		  .should('be.visible');
		
		cy.log('Click on arrow to close dropdown');
		cy.get('.DropdownTree__arrow--up')
		  .click();
		
		cy.log('Verify dropdown is closed');
		cy.get('div.TreeContainer')
		  .should('not.exist');
		  
  })
  
  it('Expand and collapse parent node',()=>{
		  
		cy.get('[data-testid$="node-header-node1"]').then(($node)=>{  
			const length = $node.length;
			cy.get('[data-testid$="node-header-node1"] div.TreeNodeExpandIcon')
			  .click()
			  .should('have.class','TreeNodeExpandIcon--expanded');
			  
			cy.log('Verify number of nodes in the menu increased');
			cy.get('div.TreeNode')
			  .its('length')
			  .should('be.gt',length);
			
			cy.log('Collapse node');
			cy.get('[data-testid$="node-header-node1"] div.TreeNodeExpandIcon')
			  .click()
			  .should('not.have.class','TreeNodeExpandIcon--expanded');
			
			cy.log('Verify nodes are hidden');
			cy.get('div.TreeNode')
			  .its('length')
			  .should('be.eq',length);

		  
		});
	})
	
	
	it('Select parent node',()=>{
		
		cy.log('Click on the parent node - Node 1');
		cy.get('[data-testid="TreeSelection__node-header-node1"] .TreeNode')
		  .click();
		
		cy.log('Verify parent node name is displayed in the component');  
	    cy.get('div.DropdownTree__input-text')
		  .should('contain','Node 1');
		
		cy.log('Verify dop down menu is hidden after node selection');
		cy.get('div.TreeContainer')
		  .should('not.exist');
		
		cy.log('Open dropdown');
		cy.get('div.DropdownTree')
		  .click();
		
		cy.log('Verify selected node is highlighted in the drop down menu');
		cy.get('[data-testid="TreeSelection__node-header-node1"] .TreeNode')
		  .should('have.class','TreeNode--selected');
		  
	})
		
	
	it('Select child node',()=>{
		
		cy.log('Expand Node 1');
		cy.get('[data-testid="TreeSelection__node-header-node1"] .TreeNodeExpandIcon')
		  .click()

		cy.log('Select Node 4'); 
		cy.get('[data-testid="TreeSelection__node-header-node4"] .TreeNode')
		  .click();
		
		cy.log('Verify drop down is hidden after node selection');
		cy.get('div.TreeContainer')
		  .should('not.exist');
		
		cy.log('Verify selected node including its parent nodes is displayed in the component');
		cy.get('div.DropdownTree__input-text')
		  .should('contain',"Node 1 > Node 4");
		
		cy.get('div.DropdownTree')
		  .click(); 
		
		cy.log('Verify selected node is highlighted');
		cy.get('[data-testid="TreeSelection__node-header-node4"] .TreeNode')
		  .should('have.class',"TreeNode--selected");
		
		cy.log('Verify only one node is highlighted in the nodes list');
		cy.get('div.TreeNode--selected').its('length')      
		  .should('be.eq', 1)
	})
	
	it('Select node when another node is already selected',()=>{
		
		cy.log('Expand Node 1');
		cy.get('[data-testid="TreeSelection__node-header-node1"] .TreeNodeExpandIcon')
		  .click()

		cy.log('Expand Node 2'); 
		cy.get('[data-testid="TreeSelection__node-header-node2"] .TreeNodeExpandIcon')
		  .click();
		  
		cy.log('Select Node 3'); 
		cy.get('[data-testid="TreeSelection__node-header-node3"]')
		  .click();
		
		cy.log('Verify drop down is hidden after node selection');
		cy.get('div.TreeContainer')
		  .should('not.exist');
		
		cy.log('Verify selected node including its parent nodes is displayed in the component');
		cy.get('div.DropdownTree__input-text')
		  .should('contain',"Node 1 > Node 2 > Node 3");
		
		cy.get('div.DropdownTree')
		  .click(); 
		  
		cy.log('Select Node 5'); 
		cy.get('[data-testid="TreeSelection__node-header-node5"]')
		  .click();
		  
		cy.get('div.DropdownTree')
		  .click(); 
		
		cy.log('Verify selected node is highlighted');
		cy.get('[data-testid="TreeSelection__node-header-node5"] .TreeNode')
		  .should('have.class',"TreeNode--selected");
		
		cy.log('Verify only one node is highlighted in the nodes list');
		cy.get('div.TreeNode--selected').its('length')      
		  .should('be.eq', 1)
	})
	
	
	it('Select node, click clear',()=>{
		
		cy.log('Click on Node 1');  
		cy.get('[data-testid$="node-header-node1"] .TreeNode')
		  .click();
		
		cy.log('verify node label is displayed in the component');		
		cy.get('div.DropdownTree__input-text')
		  .contains("Node 1");
		  
		cy.get('div.DropdownTree')
		  .click(); 
		  
		cy.log('click on Clear button');  
		cy.get('.Tree__clear')
		  .click();
		
		cy.log('Verify node label is not displayed in the component');
		cy.get('div.DropdownTree__input-text')
		  .should('not.contain','Node 1');
		  
		cy.get('div.DropdownTree')
		  .click();
		
		cy.log('Verify node is not highlighted as selected any more');
		cy.get('[data-testid$="node-header-node1"] .TreeNode')      
		  .should('not.have.class','TreeNode--selected');		  
	})


	it('Click cancel, no node selected',()=>{
	  
		cy.get('.Tree__clear').then(($button)=>{
			if($button.attr('enabled')){
				
				
				cy.log('click on Clear button');  
				cy.get('.Tree__clear')
				  .click();
			}
		});
		cy.log('Click cancel');
		cy.get('.Tree__cancel')
		  .click();
		
		cy.log('Verify dropdown is closed');
		cy.get('div.TreeContainer')
	      .should('not.exist');  
  })
  
  it('Click cancel, node selected',()=>{
	
	cy.log('Expand Node 1');  
	cy.get('[data-testid$="node-header-node1"] .TreeNodeExpandIcon')
	  .click();
	
	cy.log('Click on Node 2');  
	cy.get('[data-testid$="node-header-node2"]')
	  .click();
	  
	cy.log('Verify selected node appears in the component');
	cy.get('div.DropdownTree__input-text')
	  .contains("Node 2");
	
	cy.log('Open dropdown');	
	cy.get('div.DropdownTree')
	  .click();
	
	cy.log('Click on cancel button');
	cy.get('.Tree__cancel')
	  .click();
	
	cy.log('Verify dropdown is closed');
	cy.get('div.TreeContainer')
	  .should('not.exist');

	cy.log('Verify selection is not cleared');
	cy.get('div.DropdownTree__input-text')
	  .should('contain','Node 2');

  })
  
})

describe('Search functionality',()=>{
	it('search for existing node',()=>{
	 
		cy.log('Type "Node" in the search input');
		cy.get('input[type="search"]')
	      .type('Node');
		  
		cy.log('Verify nodes list is updated');  
		cy.get('.TreeNode') 
		  .should('have.length', 10);
	
		cy.log('Continue typing " 5"');
		cy.get('input[type="search"]')
		  .type(' 5');

		cy.log('Verify nodes list is updated');  
		cy.get('.TreeNode')
		  .should('have.length',3);
		
		cy.log('Verify Node 5 appears in nodes list');
		cy.get('div.TreeContainer')
	    .contains('Node 5').click();
  })
  
	it('search for not existing text',()=>{
			  
		cy.log('Type "hhh" in search input');
		cy.get('input[type="search"]')
		  .type('hhh');
		
		cy.log('Verify No results found message is displayed');
		cy.get('div.Tree')
		  .contains('No Results Found');
  })
})



