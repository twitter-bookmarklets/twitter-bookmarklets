export type Bookmarklet = {
	id: string;
	name: string;
	description: string;
	usage: string;
	href: string;
};

function toBookmarkletHref(source: string): string {
	const body = source
		.replace(/^\s*\/\/.*$/gm, '')
		.replace(/\s+/g, ' ')
		.trim();
	return `javascript:${body}`;
}

const removeLikesSource = `(()=>{
  if(!confirm("This will unlike tweets on your Twitter Likes page one by one. This cannot be undone. Continue?"))return;
  window.__twitterCleanStop=false;
  const sleep=(ms)=>new Promise((resolve)=>setTimeout(resolve,ms));
  (async()=>{
    let removed=0;
    let idle=0;
    while(!window.__twitterCleanStop&&idle<20){
      const buttons=[...document.querySelectorAll('button[data-testid="unlike"]')];
      if(buttons.length){
        idle=0;
        for(const button of buttons){
          if(window.__twitterCleanStop)break;
          if(!button.isConnected)continue;
          button.click();
          removed++;
          await sleep(1500);
        }
      }else{
        idle++;
      }
      window.scrollBy(0,Math.max(window.innerHeight*0.9,700));
      await sleep(2500);
    }
    alert("Stopped. Unlikes attempted: "+removed+"\\nIf likes remain, reload and run again.");
  })();
})();`;

const deletePostsSource = `(()=>{
  if(!confirm("This will delete your tweets and undo retweets on this timeline. This cannot be undone. Continue?"))return;
  window.__twitterCleanStop=false;
  const sleep=(ms)=>new Promise((resolve)=>setTimeout(resolve,ms));
  const closeMenu=()=>document.querySelector('[data-testid="primaryColumn"]')?.click();
  (async()=>{
    let posts=0;
    let retweets=0;
    let idle=0;
    while(!window.__twitterCleanStop&&idle<25){
      const unretweet=document.querySelector('[data-testid="unretweet"]');
      if(unretweet){
        idle=0;
        unretweet.click();
        await sleep(800);
        const confirmButton=document.querySelector('[data-testid="unretweetConfirm"]');
        if(confirmButton){
          confirmButton.click();
          retweets++;
          await sleep(1800);
          continue;
        }
        closeMenu();
      }
      let deleted=false;
      const carets=[...document.querySelectorAll('[data-testid="caret"]')];
      for(const caret of carets){
        if(window.__twitterCleanStop||!caret.isConnected)break;
        caret.click();
        await sleep(700);
        const items=[...document.querySelectorAll('[data-testid="Dropdown"] [role="menuitem"],[data-testid="Dropdown"]>*')];
        const deleteItem=items.find((item)=>/(^|\\n)(削除|Delete)(\\n|$)/i.test((item.innerText||"").trim()));
        if(deleteItem){
          deleteItem.click();
          await sleep(800);
          const confirmButton=document.querySelector('[data-testid="confirmationSheetConfirm"]');
          if(confirmButton){
            confirmButton.click();
            posts++;
            deleted=true;
            await sleep(2000);
            break;
          }
        }
        closeMenu();
        await sleep(300);
      }
      if(deleted){
        idle=0;
        continue;
      }
      idle++;
      window.scrollBy(0,Math.max(window.innerHeight*0.9,700));
      await sleep(2500);
    }
    alert("Stopped. Attempted: "+posts+" tweets / "+retweets+" retweets\\nAlso run on the Replies tab. Reload and retry if any remain.");
  })();
})();`;

const unfollowAllSource = `(()=>{
  if(!/(^|\\.)(x|twitter)\\.com$/.test(location.hostname)||!/\\/following\\/?$/.test(location.pathname)){
    alert("Open your own Following page first, then run this again.");
    return;
  }
  if(prompt("This will unfollow everyone you follow.\\nThis is hard to undo.\\nType UNFOLLOW ALL to continue.")!=="UNFOLLOW ALL")return;
  window.__twitterCleanStop=false;
  const sleep=(ms)=>new Promise((resolve)=>setTimeout(resolve,ms));
  const waitFor=async(selector,timeout=5000)=>{
    const deadline=Date.now()+timeout;
    while(Date.now()<deadline){
      const element=document.querySelector(selector);
      if(element)return element;
      await sleep(100);
    }
    return null;
  };
  (async()=>{
    let count=0;
    let idle=0;
    let errors=0;
    while(!window.__twitterCleanStop&&idle<15){
      const button=document.querySelector('[data-testid="UserCell"] [data-testid$="-unfollow"]');
      if(!button){
        idle++;
        window.scrollBy(0,Math.max(innerHeight*0.9,700));
        await sleep(2500);
        continue;
      }
      idle=0;
      const cell=button.closest('[data-testid="UserCell"]');
      button.scrollIntoView({block:"center"});
      await sleep(400);
      button.click();
      const confirmButton=await waitFor('[data-testid="confirmationSheetConfirm"]');
      if(!confirmButton){
        errors++;
        document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:true}));
        if(errors>=3)break;
        await sleep(3000);
        continue;
      }
      confirmButton.click();
      count++;
      errors=0;
      if(cell)cell.remove();
      await sleep(12000+Math.random()*13000);
    }
    alert(
      window.__twitterCleanStop
        ?"Stopped.\\nAccounts unfollowed this run: "+count
        :"Finished.\\nAccounts unfollowed this run: "+count+"\\n\\nIf anyone remains, reload and run again."
    );
  })();
})();`;

export const bookmarklets: Bookmarklet[] = [
	{
		id: 'remove-likes',
		name: 'Remove Likes',
		description: 'Unlikes tweets on your Likes page one by one, from top to bottom.',
		usage: 'Open your Twitter Likes page before running this.',
		href: toBookmarkletHref(removeLikesSource),
	},
	{
		id: 'delete-posts',
		name: 'Delete Tweets',
		description: 'Deletes your tweets and undoes retweets on the current timeline.',
		usage: 'Open your Posts or Replies tab before running.',
		href: toBookmarkletHref(deletePostsSource),
	},
	{
		id: 'unfollow-all',
		name: 'Unfollow All',
		description:
			'Unfollows people on your Following page one by one, with a confirmation for each.',
		usage: 'Open your own Following page before running this.',
		href: toBookmarkletHref(unfollowAllSource),
	},
];
