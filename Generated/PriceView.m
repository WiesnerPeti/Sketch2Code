#import "PriceView.h"
@implementation PriceView
- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if(self)
    {
	_backgroundView = [UIView new];
	_backgroundView.layer.cornerRadius = 1;
	_backgroundView.backgroundColor = [UIColor colorWithRed:1 green:1 blue:1 alpha:1];


	_priceBarImageView = [UIView new];
	_priceBarImageView.layer.cornerRadius = 4;
	_priceBarImageView.backgroundColor = [UIColor colorWithRed:0 green:0.5176470588235293 blue:1 alpha:1];


	_priceLabel = [UILabel new];
	_priceLabel.text = @"$220";
	_priceLabel.font = [UIFont fontWithName:@"SourceSansPro-Regular" size:13.65333333333333];
	_priceLabel.textColor = [UIColor colorWithRed:0.2039215686 green:0.2117647059 blue:0.2392156863 alpha:1];


	_titleLabel = [UILabel new];
	_titleLabel.text = @"Section";
	_titleLabel.font = [UIFont fontWithName:@"SourceSansPro-Regular" size:13.65333333333333];
	_titleLabel.textColor = [UIColor colorWithRed:0.2039215686 green:0.2117647059 blue:0.2392156863 alpha:1];


	_arrow = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"arrow"]];


	[self addSubview:_backgroundView];
	[self addSubview:_priceBarImageView];
	[self addSubview:_priceLabel];
	[self addSubview:_titleLabel];
	[self addSubview:_arrow];

    }
    return self;
}
- (void)layoutSubviews
{
    [super layoutSubviews];

	[_backgroundView setFrame:CGRectMake(0,1,320,50)];
	[_priceBarImageView setFrame:CGRectMake(60,23,173,9)];
	[_priceLabel setFrame:CGRectMake(244,19,28,17)];
	[_titleLabel setFrame:CGRectMake(9,18,43,17)];
	[_arrow setFrame:CGRectMake(self.bounds.size.width - 10 - 8,self.bounds.size.height/2.0 - 12/2.0,8,12)];

}
@end
