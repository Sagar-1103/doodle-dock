export function WaveSvg() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M5.879 2.625h8.242a3.254 3.254 0 0 1 3.254 3.254v8.242a3.254 3.254 0 0 1-3.254 3.254H5.88a3.254 3.254 0 0 1-3.254-3.254V5.88a3.254 3.254 0 0 1 3.254-3.254Z"
        stroke="currentColor"
        strokeWidth="1.25"
      ></path>

      <mask
        id="WavyLinesMask"
        maskUnits="userSpaceOnUse"
        x="2"
        y="2"
        width="16"
        height="16"
      >
        <path
          d="M5.879 2.625h8.242a3.254 3.254 0 0 1 3.254 3.254v8.242a3.254 3.254 0 0 1-3.254 3.254H5.88a3.254 3.254 0 0 1-3.254-3.254V5.88a3.254 3.254 0 0 1 3.254-3.254Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1.25"
        ></path>
      </mask>

      <g mask="url(#WavyLinesMask)">
        <path
          d="M2 15 
             Q 3.5 13 5 15 
             Q 6.5 17 8 15 
             Q 9.5 13 11 15 
             Q 12.5 17 14 15 
             Q 15.5 13 17 15 
             Q 18.5 17 20 15"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>

        <path
          d="M2 12 
             Q 3.5 10 5 12 
             Q 6.5 14 8 12 
             Q 9.5 10 11 12 
             Q 12.5 14 14 12 
             Q 15.5 10 17 12 
             Q 18.5 14 20 12"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>

        <path
          d="M2 9 
             Q 3.5 7 5 9 
             Q 6.5 11 8 9 
             Q 9.5 7 11 9 
             Q 12.5 11 14 9 
             Q 15.5 7 17 9 
             Q 18.5 11 20 9"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>

        <path
          d="M2 6 
             Q 3.5 4 5 6 
             Q 6.5 8 8 6 
             Q 9.5 4 11 6 
             Q 12.5 8 14 6 
             Q 15.5 4 17 6 
             Q 18.5 8 20 6"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>

        <path
          d="M2 3 
             Q 3.5 1 5 3 
             Q 6.5 5 8 3 
             Q 9.5 1 11 3 
             Q 12.5 5 14 3 
             Q 15.5 1 17 3 
             Q 18.5 5 20 3"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </g>
    </svg>
  );
}

export function FillSvg(){
    return (
        <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><g clipPath="url(#a)"><path d="M4.91 2.625h10.18a2.284 2.284 0 0 1 2.285 2.284v10.182a2.284 2.284 0 0 1-2.284 2.284H4.909a2.284 2.284 0 0 1-2.284-2.284V4.909a2.284 2.284 0 0 1 2.284-2.284Z" stroke="currentColor" strokeWidth="1.25"></path></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h20v20H0z"></path></clipPath></defs></svg>
    );
}

export function CrossSvg(){
    return (
        <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><g clipPath="url(#a)"><path d="M5.879 2.625h8.242a3.254 3.254 0 0 1 3.254 3.254v8.242a3.254 3.254 0 0 1-3.254 3.254H5.88a3.254 3.254 0 0 1-3.254-3.254V5.88a3.254 3.254 0 0 1 3.254-3.254Z" stroke="currentColor" strokeWidth="1.25"></path><mask id="FillCrossHatchIcon" maskUnits="userSpaceOnUse" x="-1" y="-1" width="22" height="22" className="mask-alpha"><path d="M2.426 15.044 15.044 2.426M7.383 20 20 7.383M0 12.617 12.617 0m-7.98 17.941L17.256 5.324m-2.211 12.25L2.426 4.956M20 12.617 7.383 0m5.234 20L0 7.383m17.941 7.98L5.324 2.745" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"></path></mask><g mask="url(#FillCrossHatchIcon)"><path d="M14.121 2H5.88A3.879 3.879 0 0 0 2 5.879v8.242A3.879 3.879 0 0 0 5.879 18h8.242A3.879 3.879 0 0 0 18 14.121V5.88A3.879 3.879 0 0 0 14.121 2Z" fill="currentColor"></path></g></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h20v20H0z"></path></clipPath></defs></svg>
    );
}

export function HatchSvg(){
    return (
        <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M5.879 2.625h8.242a3.254 3.254 0 0 1 3.254 3.254v8.242a3.254 3.254 0 0 1-3.254 3.254H5.88a3.254 3.254 0 0 1-3.254-3.254V5.88a3.254 3.254 0 0 1 3.254-3.254Z" stroke="currentColor" strokeWidth="1.25"></path><mask id="FillHachureIcon" maskUnits="userSpaceOnUse" x="2" y="2" width="16" height="16" className="mask-alpha" ><path d="M5.879 2.625h8.242a3.254 3.254 0 0 1 3.254 3.254v8.242a3.254 3.254 0 0 1-3.254 3.254H5.88a3.254 3.254 0 0 1-3.254-3.254V5.88a3.254 3.254 0 0 1 3.254-3.254Z" fill="currentColor" stroke="currentColor" strokeWidth="1.25"></path></mask><g mask="url(#FillHachureIcon)"><path d="M2.258 15.156 15.156 2.258M7.324 20.222 20.222 7.325m-20.444 5.35L12.675-.222m-8.157 18.34L17.416 5.22" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"></path></g></svg>
    );
}

export function HorizontalSvg(){
    return (
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5.879 2.625h8.242a3.254 3.254 0 0 1 3.254 3.254v8.242a3.254 3.254 0 0 1-3.254 3.254H5.88a3.254 3.254 0 0 1-3.254-3.254V5.88a3.254 3.254 0 0 1 3.254-3.254Z" stroke="currentColor" strokeWidth="1.25"></path>
            
            <mask id="HorizontalLinesMask" maskUnits="userSpaceOnUse" x="2" y="2" width="16" height="16">
                <path d="M5.879 2.625h8.242a3.254 3.254 0 0 1 3.254 3.254v8.242a3.254 3.254 0 0 1-3.254 3.254H5.88a3.254 3.254 0 0 1-3.254-3.254V5.88a3.254 3.254 0 0 1 3.254-3.254Z" fill="currentColor" stroke="currentColor" strokeWidth="1.25"></path>
            </mask>
            
            <g mask="url(#HorizontalLinesMask)">
                <line x1="2" y1="4" x2="18" y2="4" stroke="currentColor" strokeWidth="1.25" />
                <line x1="2" y1="6" x2="18" y2="6" stroke="currentColor" strokeWidth="1.25" />
                <line x1="2" y1="8" x2="18" y2="8" stroke="currentColor" strokeWidth="1.25" />
                <line x1="2" y1="10" x2="18" y2="10" stroke="currentColor" strokeWidth="1.25" />
                <line x1="2" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="1.25" />
                <line x1="2" y1="14" x2="18" y2="14" stroke="currentColor" strokeWidth="1.25" />
                <line x1="2" y1="16" x2="18" y2="16" stroke="currentColor" strokeWidth="1.25" />
            </g>
        </svg>
    );
}

export function GridSvg(){
    return (<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5.879 2.625h8.242a3.254 3.254 0 0 1 3.254 3.254v8.242a3.254 3.254 0 0 1-3.254 3.254H5.88a3.254 3.254 0 0 1-3.254-3.254V5.88a3.254 3.254 0 0 1 3.254-3.254Z" stroke="currentColor" strokeWidth="1.25"></path>
        
        <mask id="GridLinesMask" maskUnits="userSpaceOnUse" x="2" y="2" width="16" height="16">
          <path d="M5.879 2.625h8.242a3.254 3.254 0 0 1 3.254 3.254v8.242a3.254 3.254 0 0 1-3.254 3.254H5.88a3.254 3.254 0 0 1-3.254-3.254V5.88a3.254 3.254 0 0 1 3.254-3.254Z" fill="currentColor" stroke="currentColor" strokeWidth="1.25"></path>
        </mask>
        
        <g mask="url(#GridLinesMask)">
          <line x1="2" y1="4" x2="18" y2="4" stroke="currentColor" strokeWidth="1" />
          <line x1="2" y1="7" x2="18" y2="7" stroke="currentColor" strokeWidth="1" />
          <line x1="2" y1="10" x2="18" y2="10" stroke="currentColor" strokeWidth="1" />
          <line x1="2" y1="13" x2="18" y2="13" stroke="currentColor" strokeWidth="1" />
          <line x1="2" y1="16" x2="18" y2="16" stroke="currentColor" strokeWidth="1" />
          
          <line x1="4" y1="2" x2="4" y2="18" stroke="currentColor" strokeWidth="1" />
          <line x1="7" y1="2" x2="7" y2="18" stroke="currentColor" strokeWidth="1" />
          <line x1="10" y1="2" x2="10" y2="18" stroke="currentColor" strokeWidth="1" />
          <line x1="13" y1="2" x2="13" y2="18" stroke="currentColor" strokeWidth="1" />
          <line x1="16" y1="2" x2="16" y2="18" stroke="currentColor" strokeWidth="1" />
        </g>
      </svg>);
}